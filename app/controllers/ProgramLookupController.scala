package controllers

import javax.inject._

import play.api._
import play.api.libs.json.Json
import play.api.mvc._
import services.{Client, ConversionInfo, Program, ProgramService}

/**
  * Created by howard.fackrell on 9/29/16.
  */
@Singleton
class ProgramLookupController @Inject() (programService : ProgramService) extends Controller {

  implicit val conversionFormat = Json.format[ConversionInfo]
  implicit val programFormat = Json.format[Program]
  implicit val clientFormat = Json.format[Client]

  def findProgramForStp(stp : String) = Action {
    val json = Json.toJson(programService.lookupProgramsForStp(stp).get.programs)
    Ok(json)
  }

  def test(stp : String) = Action {
    val programs = programService.lookupProgramsForStp(stp)
    val json = Json.toJson(programs.get.programs)
    Ok(json)
  }
}
