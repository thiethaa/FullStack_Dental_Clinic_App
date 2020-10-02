package com.thiethaa.dental_treatment_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "DENTAL_TREATMENT")
public class Treatment implements Serializable {

    @Id
    private String id;

    @Column(name = "Name")
    private String name;

    @Column(name = "Title")
    private String title;

    @Column(name = "Image")
    @Lob
    private byte[] image;

    private String fileType;

    @Column(name = "Description")
    private String description;

    private String url;

    private String thumbnailUrl;

}
