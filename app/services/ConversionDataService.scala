package services

import anorm._
import anorm.SqlParser.{str}
import play.api.db.Database
import play.api.db.DB

/**
  * Created by howard.fackrell on 11/2/16.
  */
case class Conversion(val id : Long, val stp: String, val originalProgramId : Int, val programId : Int, val steps : List[ConversionStep])

case class ConversionStep(val conversionId : Long, val seqId : Int, val status : String, val error : String)

class ConversionDataService {

//  DB.withConnection("default") { implicit conn =>
//    val parser: ResultSetParser[Long ~ String ~ String] = str("code") ~ str("salesorg") ~ str("description")
//    val result =
//      SQL("""
//            |select code, salesorg, description from octsalesorg
//          """).as(parser.flatten.* )
//  }

}
