// package com.smartcontact.entity;

// import java.util.ArrayList;
// import java.util.List;

// import jakarta.persistence.CascadeType;
// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.FetchType;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.OneToMany;
// import jakarta.persistence.Table;
// import lombok.AllArgsConstructor;
// import lombok.Getter;
// import lombok.NoArgsConstructor;
// import lombok.Setter;

// @Entity 
// @Table(name="USER")
// @Getter 
// @Setter 
// @NoArgsConstructor 
// @AllArgsConstructor 
// public class User {

//     @Id 
//     @GeneratedValue(strategy = GenerationType.AUTO)
//     private Integer id;
//     private String name;
//     @Column(unique=true)
//     private String email;
//     private String password;
//     private String role;
//     private Boolean enabled;
//     private String imageUrl;
//     @Column(length = 500)
//     private String about;

//     @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY,mappedBy = "user")
//     private List<Contact> contact=new ArrayList<Contact>();

// }
