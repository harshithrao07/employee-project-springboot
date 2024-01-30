package com.harshith.project.config;

import com.harshith.project.repository.EmployeeRepository;
import com.harshith.project.model.Employee;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
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
                    "Regional Manager",
                    LocalDate.of(1980, Month.OCTOBER, 8)
            );


            Employee jim = new Employee(
                    "Jim",
                    "Halpert",
                    "jimhalpert@gmail.com",
                    "Salesman",
                    LocalDate.of(1991, Month.JULY, 11)
            );

            Employee pam = new Employee(
                    "Pam",
                    "Beesly",
                    "pam@gmail.com",
                    "Receptionist",
                    LocalDate.of(1992, Month.AUGUST, 21)
            );

            Employee dwight = new Employee(
                    "Dwight",
                    "Schrute",
                    "dwightshrute@gmail.com",
                    "Salesman",
                    LocalDate.of(1990, Month.JANUARY, 4)
            );

            Employee andy = new Employee(
                    "Andy",
                    "Benard",
                    "andybenard@gmail.com",
                    "Salesman",
                    LocalDate.of(1988, Month.SEPTEMBER, 16)
            );

            Employee phyllis = new Employee(
                    "Phyllis",
                    "Vance",
                    "phyllis@gmail.com",
                    "Salesman",
                    LocalDate.of(1980, Month.AUGUST, 16)
            );

            Employee stanley = new Employee(
                    "Stanley",
                    "Hudson",
                    "stanley@gmail.com",
                    "Salesman",
                    LocalDate.of(1977, Month.FEBRUARY, 12)
            );

            Employee toby = new Employee(
                    "Toby",
                    "Flenderson",
                    "tobyflenderson@gmail.com",
                    "HR",
                    LocalDate.of(1987, Month.NOVEMBER, 17)
            );

            Employee kevin = new Employee(
                    "Kevin",
                    "Malone",
                    "kevinmalone@gmail.com",
                    "Accountant",
                    LocalDate.of(1993, Month.NOVEMBER, 20)
            );

            Employee oscar = new Employee(
                    "Oscar",
                    "Martinez",
                    "oscar@gmail.com",
                    "Accountant",
                    LocalDate.of(1994, Month.JUNE, 20)
            );

            Employee angela = new Employee(
                    "Angela",
                    "Martin",
                    "angela@gmail.com",
                    "Accountant",
                    LocalDate.of(1995, Month.JULY, 11)
            );

            Employee kelly = new Employee(
                    "Kelly",
                    "Kapoor",
                    "kelly@gmail.com",
                    "Customer Service",
                    LocalDate.of(1999, Month.OCTOBER, 4)
            );

            Employee creed = new Employee(
                    "Creed",
                    "Bratton",
                    "creed@gmail.com",
                    "Quality Assurance",
                    LocalDate.of(1912, Month.FEBRUARY, 11)
            );

            Employee meredith = new Employee(
                    "Meredith",
                    "Palmer",
                    "meredith@gmail.com",
                    "Supplier Relations",
                    LocalDate.of(1989, Month.JULY, 3)
            );

            Employee darryl = new Employee(
                    "Darryl",
                    "Philbin",
                    "darryl@gmail.com",
                    "Warehouse Foreman",
                    LocalDate.of(1988, Month.MAY, 19)
            );

            Employee ryan = new Employee(
                    "Ryan",
                    "Howard",
                    "ryan@gmail.com",
                    "Temp",
                    LocalDate.of(1997, Month.JULY, 11)
            );

            repository.saveAll(List.of(micheal, pam, jim, dwight, andy, phyllis, stanley, angela, oscar, kevin, kelly, toby, creed, meredith, darryl, ryan));
        };
    }
}
