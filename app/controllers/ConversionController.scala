package controllers

import javax.inject.{Inject, Singleton}

import play.api.libs.json.{JsArray, JsValue, Json}
import play.api.mvc.{Action, Controller, Result}
import services.ConversionDataService
import implicits.conversionFormat




/**
  * Created by howard.fackrell on 10/6/16.
  */
@Singleton
class ConversionController @Inject()(conversionDataService : ConversionDataService) extends Controller {

  def createConversion() = Action { request =>
    val paramsOpt : Option[JsValue] = request.body.asJson

    val resultOption : Option[Result] =for {
      params : JsValue <- paramsOpt
      stp : String <- (params \ "stp").asOpt[String]
      programId : Int <- (params \ "programId").asOpt[Int]
    } yield {

      Ok(conversionDataService.createNewConversion(stp, programId).toString)
    }

    resultOption.getOrElse(BadRequest(s"Couldn't parse the request body ${request.body}" ))
  }

  def conversion(conversionId : Long) = Action {
    Ok(Json.toJson(conversionDataService.getConversion(conversionId)))
  }

  def completed(conversionId : Long, stepId : Long) = Action {
    conversionDataService.stepCompleted(stepId)
    Ok(Json.toJson(conversionDataService.getConversion(conversionId)))
  }


}
