package data

/**
  * Created by howard.fackrell on 11/7/16.
  */
class Data {

}


case class Program(val stp : String, val programId : Int, val name : String, conversions : List[ConversionInfo]) {}

case class Client(val stp : String, val programs : List[Program] ) {}

case class ConversionInfo(val id : Long, val programId: Int, val name : String)

case class Conversion(val id : Long, val stp: String, val originalProgramId : Int, val programId : Option[Int], val steps : List[Step])
case class Step(val id : Long, val conversion_id : Long, val seq_id : Int, val name : String, val status : String, val error : Option[String])

case class WSProgram(val customerName : String, programId : String, status : String, templateDescription : String, soldToPartyNumber : String, programName : String)


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

