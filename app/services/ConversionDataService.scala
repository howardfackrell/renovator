package services

import javax.inject.{Inject, Singleton}

import anorm._
import data.{Conversion, Step}
import play.api.db.Database

/**
  * Created by howard.fackrell on 11/2/16.
  */

case class ConversionStepRow(val id : Long, val seq_id : Int, val name : String)
case class ConversionRow(val id : Long, val stp : String, val original_program_id : Int, val program_id : Option[Int])

@Singleton
class ConversionDataService @Inject()(db : Database) {

  val stepParser = Macro.namedParser[Step]
  val conversionStepRowParser = Macro.namedParser[ConversionStepRow]
  val conversionRowParser = Macro.namedParser[ConversionRow]


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

  def getConversion(id : Long) : Conversion = {
    db.withTransaction{ implicit conn =>
      val steps : List[Step] = SQL("select s.id, s.conversion_id, cs.seq_id, cs.name, s.status, s.error " +
        "from step s " +
        "join conversion_step cs on s.conversion_step_id = cs.id " +
        "where conversion_id = {conversionId} " +
        "order by  cs.seq_id ")
        .on('conversionId -> id)
        .as(stepParser.*)


      val conv :ConversionRow = SQL("select id, stp, original_program_id, program_id from conversion where id = {id}")
        .on('id -> id)
        .as(conversionRowParser.single)

      Conversion(conv.id, conv.stp, conv.original_program_id, conv.program_id, steps)
    }
  }

}
