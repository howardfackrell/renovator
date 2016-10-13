import play.sbt.PlayImport.PlayKeys.playRunHooks

name := """renovator"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala, SbtWeb)

scalaVersion := "2.11.8"

libraryDependencies ++= Seq(
  jdbc,
  cache,
  ws,
  "org.webjars" %% "webjars-play" % "2.5.0",
  "org.webjars" % "react" % "0.14.8",
  "org.scalatestplus.play" %% "scalatestplus-play" % "1.5.1" % Test

)

//playRunHooks <+= baseDirectory.map(Webpack.apply)



