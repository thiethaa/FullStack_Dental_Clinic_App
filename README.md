#FullStack_Dental_Clinic_App

ABOUT THE DENTAL APP
Implement back-End using Spring Boot, Spring Data Jpa,Spring Web,Spring Cloud Gateway, Spring Actuator, Spring Hystrix, Spring Hystrix Dashboard,Spring Cloud Eureka Server,Spring JMS, ActiveMQ Artemis,Spring Mail API,Hibernate,Lombok,Manage Pom File using Maven BOM . Implement Front-End using ReactJS, React Router Dom, Axios,React Bootstrap,FontAwesome

Microservices App example with 6 services run in Back-End

    Dental Patient Service
    Dental Employess Service
    Dental Treatment Service
    Dental Eureka Server
    Dental Api gateway Service
    Dental Hystrix Dashboard service
    
-   Implement Dental-Treatment, Dental-Employee and Dental-Patient services using Spring Boot, Spring Data Jpa,Hibernate and MySQL driver to Persist Data to 
    DB,Spring Web,Spring Cloud Eureka Client to allow Registration to eureka Discovery Server,Implement Spring JMS and using ActiveMQ Artemis as a Broker,Spring
    Mail API to sending Notification,Lombok,Manage Parent Pom File using Maven BOM. 
-   DentalClinic API Gateway is another springboot project that use Spring Cloud Gateway, Actuator,Hystrix and eureka client. --> Use Postman to test all CURD 
    operation.
-   this app also implement Springboot JMS template and activeMQ Artemis as a broker in order to aproach communication between services.Using Postman to send   
            message to all servers (POST) http://localhost:8040/sendMsg.
                
                start ActiveMQ Artemis >> 
                    go to Directory where ActiveMq has been Store, example :
                    
                            cd MyActiveMQ
                            cd bin
                            ./artemis run
                
-   Dental Eureka_server is a SpringBoot project that use Spring Cloud Eureka server to discover and Registry each service, Eureka server running on 
            http://localhost:8761/
-   DentalClinic Hystrix Dashboard is a Springboot project that use hystrix dashboard to monitor hystrix metrix in realtime, hystrix dashboar running on 
            localhost://8060/hystrix and monitoring localhost:8050/actuator/hystrix.stream
-   Write unit test for Rest APIs using JUnit and WebMvcTest
-   Implement Spring Mail APIs to send email notification to the patient by @gmail.com. 
            patient dummy gmail : test.dental.app@gmail.com 
            admin dummy gmail : dentalclinic.app.admn@gmail.com
-   finally Implement the Front-End using React.js, React-Router-Dom, React-Bootstrap, FontAwesome, Axios library to consume API, handle the login session with 
            react-router-DOM 
            
                        username : operator/admin 
                        password : password
            

NOTE:
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
