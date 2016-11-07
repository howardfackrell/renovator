package services

import javax.inject.Inject

import com.google.inject.Singleton
import data.{ConversionInfo, Program, WSProgram}
import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.json.{Format, JsArray, JsValue, Json}
import play.api.libs.ws._

import scala.concurrent.Future
import scala.concurrent.duration._

import implicits.wsProgramFormat



/**
  * Created by howard.fackrell on 11/1/16.
  */
@Singleton
class ProgramService @Inject() (ws: WSClient) {

  def lookupProgramsForStp(stp : String) : Future[List[Program]] = {

    val request = ws.url(s"http://localhost.octanner.com:8080/skynet/rest/customer/$stp/programs")

    val futureResponse = request.withRequestTimeout(10000.millis).get()

    val futurePrograms : Future[List[Program]] = futureResponse map { response =>
      val wsPrograms = Json.parse(response.body).as[List[WSProgram]]

      wsPrograms.map{ wsProgram =>
        Program(
          stp = wsProgram.soldToPartyNumber,
          programId = wsProgram.programId.toInt,
          name = wsProgram.programName,
          List[ConversionInfo]()
        )
      }
    }

    futurePrograms
  }
}