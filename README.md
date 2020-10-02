# MavenBOM_Dental_Clinic_App
BOM on POM File
Maven parent POM (or super POM) is used to structure the project to avoid duplicate configurations using inheritance between pom files. 
    Maven parent pom can contain almost everything and those can be inherited into child pom files e.g

    1. Common data – Developers’ names, SCM address, distribution management etc.
    2. Constants – Such as version numbers
    3. Common dependencies – Common to all child. It has same effect as writing them several times in individual pom files.
    4. Properties – For example plugins, declarations, executions and IDs.
    5. Configurations
    6. Resources

BOM stands for Bill Of Materials. A BOM is a special kind of POM that is used to control the versions of a project’s dependencies and provide a central place to define and update those versions.BOM provides the flexibility to add a dependency to our module without worrying about the version that we should depend on.BOM manage the dependency by using maven POM file inheritance.
    
    
    Super POM.file    
          <project>
                <parent>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-parent</artifactId>
                    <version>2.3.4.RELEASE</version>
                    <relativePath/> <!-- lookup parent from repository -->
                </parent>

                <groupId>com.thiethaa.dental_clinic_app</groupId>
                <artifactId>parent-pom</artifactId>
                <version>0.0.1-SNAPSHOT</version>
                <name>parent-pom</name>
                <packaging>pom</packaging>
                <description>dental clinic microservices app</description>

child POM.file
        <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
          <modelVersion>4.0.0</modelVersion>

          <parent>
            <groupId>com.thiethaa.dental_clinic_app</groupId>
            <artifactId>parent-pom</artifactId>
            <version>0.0.1-SNAPSHOT</version>
            <relativePath/> <!-- lookup parent from repository -->
          </parent>

          <groupId>com.thiethaa</groupId>
          <artifactId>dental_treatment_service</artifactId>
          <name>dental_treatment_service</name>
          <description>dental_treatment_service</description>

        </project>


1. start ActiveMQ Artemis >> ./artemis run
2. histryx dashboard >> http://localhost:8060/hystrix and pass http://localhost:8050/actuator/hystrix.stream
3. eureka server >> http://localhost:8761/
