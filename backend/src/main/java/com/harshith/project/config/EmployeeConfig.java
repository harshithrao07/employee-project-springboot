package com.harshith.project.config;

import com.harshith.project.repository.EmployeeRepository;
import com.harshith.project.model.Employee;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.List;

@Configuration
public class EmployeeConfig {

    @Bean
    CommandLineRunner commandLineRunner(EmployeeRepository repository) {
        return args -> {
            Employee micheal = new Employee(
                    "Micheal",
                    "Scott",
                    "michealscott@gmail.com",
                    "Regional Manager"
            );


            Employee jim = new Employee(
                    "Jim",
                    "Halpert",
                    "jimhalpert@gmail.com",
                    "Salesman"
            );

            Employee pam = new Employee(
                    "Pam",
                    "Beesly",
                    "pam@gmail.com",
                    "Receptionist"
            );

            Employee dwight = new Employee(
                    "Dwight",
                    "Schrute",
                    "dwightshrute@gmail.com",
                    "Salesman"
            );

            Employee andy = new Employee(
                    "Andy",
                    "Benard",
                    "andybenard@gmail.com",
                    "Salesman"
            );

            Employee phyllis = new Employee(
                    "Phyllis",
                    "Vance",
                    "phyllis@gmail.com",
                    "Salesman"
            );

            Employee stanley = new Employee(
                    "Stanley",
                    "Hudson",
                    "stanley@gmail.com",
                    "Salesman"
            );

            Employee toby = new Employee(
                    "Toby",
                    "Flenderson",
                    "tobyflenderson@gmail.com",
                    "HR"
            );

            Employee kevin = new Employee(
                    "Kevin",
                    "Malone",
                    "kevinmalone@gmail.com",
                    "Accountant"
            );

            Employee oscar = new Employee(
                    "Oscar",
                    "Martinez",
                    "oscar@gmail.com",
                    "Accountant"
            );

            Employee angela = new Employee(
                    "Angela",
                    "Martin",
                    "angela@gmail.com",
                    "Accountant"
            );

            Employee kelly = new Employee(
                    "Kelly",
                    "Kapoor",
                    "kelly@gmail.com",
                    "Customer Service"
            );

            Employee creed = new Employee(
                    "Creed",
                    "Bratton",
                    "creed@gmail.com",
                    "Quality Assurance"
            );

            Employee meredith = new Employee(
                    "Meredith",
                    "Palmer",
                    "meredith@gmail.com",
                    "Supplier Relations"
            );

            Employee darryl = new Employee(
                    "Darryl",
                    "Philbin",
                    "darryl@gmail.com",
                    "Warehouse Foreman"
            );

            Employee ryan = new Employee(
                    "Ryan",
                    "Howard",
                    "ryan@gmail.com",
                    "Temp"
            );

            repository.saveAll(List.of(micheal, pam, jim, dwight, andy, phyllis, stanley, angela, oscar, kevin, kelly, toby, creed, meredith, darryl, ryan));
        };
    }
}
