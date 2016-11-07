
import play.api.libs.json.Json

/**
  * Created by howard.fackrell on 11/7/16.
  */
package object implicits {

  implicit val conversionInfoFormat = Json.format[data.ConversionInfo]
  implicit val programFormat = Json.format[data.Program]
  implicit val wsProgramFormat = Json.format[data.WSProgram]

}
