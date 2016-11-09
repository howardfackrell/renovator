import data.{Conversion, Step}
import org.scalatest.{FlatSpec, FunSpec, FunSuite, ShouldMatchers}
import play.api.libs.json.Json
import implicits.conversionFormat

/**
  * Created by howard.fackrell on 11/8/16.
  */
class DataSpec extends FlatSpec with ShouldMatchers {

  "Conversion" should "serialize to Json" in {
    val steps = List(
      Step(1, 1, 1, "Copy Program", "COMPLETED", None),
      Step(1, 1, 1, "Convert CLUI", "NOT_STARTED", None)
    )
    val conversion = Conversion(1, "0000368258", 3, Some(4), steps)

    val json: String = Json.toJson(conversion).toString()
    val expectation: String =
      """{"id":1,"stp":"0000368258","originalProgramId":3,"programId":4,"steps":[{"id":1,"conversionId":1,"seqId":1,"name":"Copy Program","status":"COMPLETED"},{"id":1,"conversionId":1,"seqId":1,"name":"Convert CLUI","status":"NOT_STARTED"}]}"""
    println(json)
    println(expectation)
    json should be(expectation)
  }

}
