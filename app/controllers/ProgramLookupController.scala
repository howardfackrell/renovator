package controllers

import javax.inject._

import play.api._
import play.api.libs.json.Json
import play.api.mvc._



case class Program(val stp : String, val programId : Int, val name : String, conversions : List[ConversionInfo]) {}



case class Client(val stp : String, val programs : List[Program] ) {
  override def equals(that: Any): Boolean = that match {
    case other : Client => stp.eq(other.stp)
    case _  => false
  }
}

case class ConversionInfo(val id : Long, programId: Int, name : String) {

}



/**
  * Created by howard.fackrell on 9/29/16.
  */
@Singleton
class ProgramLookupController @Inject() extends Controller {

  val conversionsFor2  = List[ConversionInfo](ConversionInfo(16,  15, "Fifteen"))

  val conversionsFor4 = List(
    ConversionInfo(52, 21, "Twenty One"),
    ConversionInfo(53, 22, "Twenty two")
  )

  val testData : Map[String, Client] = Map (
    ("0000368258" , Client("0000368258", List(Program("0000368258", 1, "One", List()), Program("0000368258", 2, "Two", conversionsFor2)))),
    ("0000123456" , Client("0000123456", List(Program("0000123456", 3, "Three", List()), Program("0000123456", 4, "Four", conversionsFor4))))
  )

  def findProgramForStp(stp : String) = Action {
    implicit val conversionFormat = Json.format[ConversionInfo]
    implicit val programFormat = Json.format[Program]

    implicit val clientFormat = Json.format[Client]
    val json = Json.toJson(testData.get(stp).get.programs)
    Ok(json)
  }

}
