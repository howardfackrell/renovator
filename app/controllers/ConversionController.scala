package controllers

import javax.inject.{Inject, Singleton}

import play.api.libs.json.{JsArray, JsValue, Json}
import play.api.mvc.{Action, Controller, Result}
import services.ConversionDataService


case class StepDefinition(val name : String, val seqId : Int)

case class Step (val step : StepDefinition, val status : String, val error : String)

case class Conversion (val stp : String, val originalProgramId : Int, val programId : Int, steps : List[Step])

/**
  * Created by howard.fackrell on 10/6/16.
  */
@Singleton
class ConversionController @Inject()(conversionDataService : ConversionDataService) extends Controller {

  val copyProgram = StepDefinition("Copy Program", 1)
  val pushImagesToDctm = StepDefinition("Documentum Image Setup", 2)
  val switchMessaging = StepDefinition("Switch Messaging", 3)
  val copyClui = StepDefinition("Copy Clui", 4)

  val completed = "completed"
  val pending = "pending"
  val failed = "failed"

  val conversions = Map(
    (1, new Conversion("0000368258", 3, 12, List(
      Step(copyProgram, completed, ""),
      Step(pushImagesToDctm, "failed", "Everything fell apart"),
      Step(switchMessaging, "pending", ""),
      Step(copyClui, "notStarted", "")
    ))),
    (2, new Conversion("0000123456", 2, 20, List(
      Step(copyProgram, completed, ""),
      Step(pushImagesToDctm, "complete", "Everything fell apart"),
      Step(switchMessaging, "notStarted", ""),
      Step(copyClui, "notStarted", "")
    ))),
    (3, new Conversion("0000123456", 3, 30, List(
      Step(copyProgram, completed, ""),
      Step(pushImagesToDctm, "complete", "Everything fell apart"),
      Step(switchMessaging, "notStarted", ""),
      Step(copyClui, "notStarted", "")
    )))

  )

  implicit val stepDefinitionFormat = Json.format[StepDefinition]
  implicit val stepFormat = Json.format[Step]
  implicit val conversionFormat = Json.format[Conversion]

  def customerConversions(stp : String) = Action {
    val conversionsForStp : Iterable[Conversion] = conversions.values.filter { e => e.stp == stp }

    val jsonConversions : List[JsValue] = conversionsForStp.map { c =>
      Json.toJson(c)
    }.toList

    Ok(JsArray(jsonConversions))
  }

  def customerProgramConversion(stp : String, programId : Int) = Action {
    val selectedConversion : Option[Conversion] = conversions.values.filter { e =>
      e.stp == stp && e.programId == programId
    }.headOption

    val jsonConversion : Option[JsValue] = selectedConversion.map { c =>
      Json.toJson(c)
    }

    jsonConversion match {
      case Some(conversion) => Ok(conversion)
      case None => Ok("{}")
    }

  }

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


}
