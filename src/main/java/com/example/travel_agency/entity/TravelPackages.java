package com.example.travel_agency.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "packages")
public class TravelPackages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;


    private double budget;
    private int duration;

    @Column(columnDefinition = "TEXT")
    private String includedServices;

    public TravelPackages() {
    }

    public TravelPackages(Long id, String name, String description, double budget, int duration, String includedServices) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.budget = budget;
        this.duration = duration;
        this.includedServices = includedServices;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getBudget() {
        return budget;
    }

    public void setBudget(double budget) {
        this.budget = budget;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getIncludedServices() {
        return includedServices;
    }

    public void setIncludedServices(String includedServices) {
        this.includedServices = includedServices;
    }

    @Override
    public String toString() {
        return "TravelPackages{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", budget=" + budget +
                ", duration=" + duration +
                ", includedServices='" + includedServices + '\'' +
                '}';
    }

}
