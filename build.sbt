import play.sbt.PlayImport.PlayKeys.playRunHooks

import scala.util.Properties

name := """renovator"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala, SbtWeb)

scalaVersion := "2.11.7"

val artifactoryUser: String = Properties.envOrElse("OCT_ARTIFACTORY_USER", "BADUSER")

val artifactoryPassword: String = Properties.envOrElse("OCT_ARTIFACTORY_PASS", "BADPASSWORD")

credentials += Credentials("Artifactory Realm", "artifactory.octanner.net", artifactoryUser, artifactoryPassword)

resolvers += Resolver.url("OC Tanner Releases", url("https://artifactory.octanner.net/releases"))

resolvers += Resolver.url("OC Tanner Snapshots", url("https://artifactory.octanner.net/snapshots"))

libraryDependencies ++= Seq(
  jdbc,
  cache,
  ws,
  evolutions,
  "com.typesafe.play" %% "anorm" % "2.5.0",
  "org.postgresql" % "postgresql" % "9.4.1211",
  "org.webjars" %% "webjars-play" % "2.5.0",
  "org.scalatestplus.play" %% "scalatestplus-play" % "1.5.1" % Test

)

playRunHooks <+= baseDirectory.map(Webpack.apply)



