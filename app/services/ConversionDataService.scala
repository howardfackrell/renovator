package services

import java.sql.Connection
import javax.inject.{Inject, Singleton}

import anorm._
import anorm.SqlParser.str
import play.api.db.Database

/**
  * Created by howard.fackrell on 11/2/16.
  */
case class Conversion(val id : Long, val stp: String, val originalProgramId : Int, val programId : Int, val steps : List[ConversionStep])


case class ConversionStep(val conversionId : Long, val seqId : Int, val status : String, val error : String)

case class StepRow(val id : Long, val conversion_id : Long, val conversion_step_id : Long, val status : String, val error : Option[String])
case class ConversionStepRow(val id : Long, val seq_id : Int, val name : String)

@Singleton
class ConversionDataService @Inject()(db : Database) {

  val stepRowParser = Macro.namedParser[StepRow]
  val conversionStepRowParser = Macro.namedParser[ConversionStepRow]

  def read(): String = {

    val count : String = db.withTransaction { implicit conn: Connection =>
      val rs :List[StepRow] = SQL("select * from step ").as(stepRowParser.*)
      rs.foldRight("") { (row, str) =>
        str + "\n" + row.id + " " + row.conversion_id + " " + row.conversion_step_id + " " + row.status + row.error.getOrElse("")
      }
    }

    s"$count"
  }

  def createNewConversion(stp : String, originalProgramId : Int) : Long = {

    val conversionId = db.withTransaction{ implicit conn =>

      val conversionId : Option[Long] = SQL("insert into conversion (stp, original_program_id) values ({stp}, {originalProgramId})")
        .on('stp -> stp, 'originalProgramId -> originalProgramId)
        .executeInsert()

      val steps : List[ConversionStepRow] = SQL("select id, seq_id, name from conversion_step order by seq_id").as(conversionStepRowParser.*)

      val stepParams = steps map {conversionStep =>
        Seq[NamedParameter]('conversionId -> conversionId, 'conversionStepId -> conversionStep.id, 'status -> "NOT_STARTED")
      }

      val StepIds = BatchSql(
        "insert into step (conversion_id, conversion_step_id, status) values ({conversionId}, {conversionStepId}, {status})",
        stepParams
      ).execute()

      conversionId.get
    }

    conversionId
  }

}
