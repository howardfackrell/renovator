package controllers

import javax.inject._

import play.api._
import play.api.libs.json.Json
import play.api.mvc._



case class Program(val stp : String, val programId : Int, val name : String) {
  override def equals(that: Any): Boolean = that match {
    case other : Program => stp.eq(other.stp) && programId == other.programId
    case _ => false
  }
}


case class Client(val stp : String, val programs : List[Program] ) {
  override def equals(that: Any): Boolean = that match {
    case other : Client => stp.eq(other.stp)
    case _  => false
  }
}


/**
  * Created by howard.fackrell on 9/29/16.
  */
@Singleton
class ProgramLookupController @Inject() extends Controller {

  val testData : Map[String, Client] = Map (
    ("0000368258" , Client("0000368258", List(Program("0000368258", 1, "One"), Program("0000368258", 2, "Two")))),
    ("0000123456" , Client("0000123456", List(Program("0000123456", 3, "Three"), Program("0000123456", 4, "Four"))))
  )

  def findProgramForStp(stp : String) = Action {
    implicit val programFormat = Json.format[Program]
    implicit val clientFormat = Json.format[Client]
    val json = Json.toJson(testData.get(stp).get.programs)
    Ok(json)
  }

}
