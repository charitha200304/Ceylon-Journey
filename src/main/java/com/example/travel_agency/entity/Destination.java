package com.example.travel_agency.entity;


import com.example.travel_agency.enums.Category;
import jakarta.persistence.*;

@Entity
@Table(name = "destinations")
public class Destination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String location;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String imageURL;

    @Enumerated(EnumType.STRING)
    private Category cateogary;

    public Destination() {
    }

    public Destination(Long id, String name, String location, String description, String imageURL, Category cateogary) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.description = description;
        this.imageURL = imageURL;
        this.cateogary = cateogary;
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public Category getCateogary() {
        return cateogary;
    }

    public void setCateogary(Category cateogary) {
        this.cateogary = cateogary;
    }

    @Override
    public String toString() {
        return "Destination{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", description='" + description + '\'' +
                ", imageURL='" + imageURL + '\'' +
                ", cateogary=" + cateogary +
                '}';
    }
}
