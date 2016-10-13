
import play.sbt.PlayRunHook
import sbt._

object Webpack {
  def apply(base: File): PlayRunHook = {
    object WebpackHook extends PlayRunHook {
      var process: Option[Process] = None

      override def beforeStarted() = {
        println("Starting up....")
        process = Option(
          Process("webpack", base).run()
        )
      }

      override def afterStarted(addr: java.net.InetSocketAddress) = {
        println("afterStarted....")
        process = Option(
          Process("webpack --watch", base).run()
        )
      }

      override def afterStopped() = {
        println("afterStopped....")
        process.foreach(_.destroy())
        process = None
      }


      override def onError() : scala.Unit = {
        println("Crap happened.......")
      }
    }

    WebpackHook
  }
}