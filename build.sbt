import play.sbt.PlayImport.PlayKeys.playRunHooks

name := """renovator"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala, SbtWeb)

scalaVersion := "2.11.8"

credentials += Credentials(Path.userHome / ".m2" / ".credentials")

resolvers ++= Seq(
  "OC Tanner Releases" at "https://artifactory.octanner.net/releases",
  "OC Tanner Snapshots" at "https://artifactory.octanner.net/snapshots"
)

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



