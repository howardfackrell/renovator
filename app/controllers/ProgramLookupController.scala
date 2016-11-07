package controllers

import javax.inject._

import data.{Program, ConversionInfo}
import play.api.libs.json.Json
import play.api.mvc._
import services.ProgramService

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

import implicits.conversionInfoFormat
import implicits.programFormat

/**
  * Created by howard.fackrell on 9/29/16.
  */
@Singleton
class ProgramLookupController @Inject() (programService : ProgramService) extends Controller {

  def findProgramForStp(stp : String) = Action.async {

    val programs : Future[List[Program]] = programService.lookupProgramsForStp(stp)
    programs.map{ ps =>

      Ok(Json.toJson(ps))
    }
  }
}
