package services

import javax.inject.Inject

import com.google.inject.Singleton
import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.json.Json
import play.api.libs.ws._

import scala.concurrent.Future
import scala.concurrent.duration._


case class Program(val stp : String, val programId : Int, val name : String, conversions : List[ConversionInfo]) {}

case class Client(val stp : String, val programs : List[Program] ) {}

case class ConversionInfo(val id : Long, programId: Int, name : String) {}


object TestData {
  val conversionsFor2 = List[ConversionInfo](ConversionInfo(16, 15, "Fifteen"))

  val conversionsFor4 = List(
    ConversionInfo(52, 21, "Twenty One"),
    ConversionInfo(53, 22, "Twenty two")
  )

  val testData: Map[String, Client] = Map(
    ("0000368258", Client("0000368258", List(Program("0000368258", 1, "One", List()), Program("0000368258", 2, "Two", conversionsFor2)))),
    ("0000123456", Client("0000123456", List(Program("0000123456", 3, "Three", List()), Program("0000123456", 4, "Four", conversionsFor4))))
  )
}


/**
  * Created by howard.fackrell on 11/1/16.
  */
@Singleton
class ProgramService @Inject() (ws: WSClient, tokenService: TokenService) {

  def lookupProgramsForStp(stp : String) = {

    tokenService.getToken().onComplete(s => println(s))

    val request = ws.url(s"https://eclientlinkdev.octanner.com/pandora/program/$stp")

    request
      .withHeaders()
      .withRequestTimeout(10000.millis)

    TestData.testData.get(stp)
  }
}

@Singleton
class TokenService @Inject() (ws: WSClient) {

  val url = "https://vision-dev.appreciatehub.com/api/login/token"
//  val url = "https://auth-dev.appreciatehub.com/token"
  val clientId = "stp|0000368258"
  val clientSecret = "rjZ8lTI8ZDyoqqpoTXybUlyagJe2hTxNOqU88Wma8PjBuEFAepQVI5tgSFUO4wug"
//  val clientSecret = "81ca9f21318178682b924246f3812b99c61cb0a7989efabdd4254589b112ea9a"
  val grantType = "client_credentials"

  val payload = Json.obj(
    "grant_type" -> grantType,
    "customerId" -> clientId
  )

  def getToken(): Future[String] = {
    val  request = ws.url(url)

    request
      .withHeaders("Accept" -> "application/json")

    val response = request.post(payload)
    response.map( _.body )
  }
}
