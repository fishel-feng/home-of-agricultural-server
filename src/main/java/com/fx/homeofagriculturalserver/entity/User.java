package com.fx.homeofagriculturalserver.entity;

public class User {
    private Long tel;

    private String password;

    private String name;

    private Byte gender;

    private Byte age;

    private String img;

    private Byte flag;

    public User() {
    }

    public Long getTel() {
        return this.tel;
    }

    public String getPassword() {
        return this.password;
    }

    public String getName() {
        return this.name;
    }

    public Byte getGender() {
        return this.gender;
    }

    public Byte getAge() {
        return this.age;
    }

    public String getImg() {
        return this.img;
    }

    public Byte getFlag() {
        return this.flag;
    }

    public void setTel(Long tel) {
        this.tel = tel;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setGender(Byte gender) {
        this.gender = gender;
    }

    public void setAge(Byte age) {
        this.age = age;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public void setFlag(Byte flag) {
        this.flag = flag;
    }

    public boolean equals(Object o) {
        if (o == this) return true;
        if (!(o instanceof User)) return false;
        final User other = (User) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$tel = this.getTel();
        final Object other$tel = other.getTel();
        if (this$tel == null ? other$tel != null : !this$tel.equals(other$tel)) return false;
        final Object this$password = this.getPassword();
        final Object other$password = other.getPassword();
        if (this$password == null ? other$password != null : !this$password.equals(other$password)) return false;
        final Object this$name = this.getName();
        final Object other$name = other.getName();
        if (this$name == null ? other$name != null : !this$name.equals(other$name)) return false;
        final Object this$gender = this.getGender();
        final Object other$gender = other.getGender();
        if (this$gender == null ? other$gender != null : !this$gender.equals(other$gender)) return false;
        final Object this$age = this.getAge();
        final Object other$age = other.getAge();
        if (this$age == null ? other$age != null : !this$age.equals(other$age)) return false;
        final Object this$img = this.getImg();
        final Object other$img = other.getImg();
        if (this$img == null ? other$img != null : !this$img.equals(other$img)) return false;
        final Object this$flag = this.getFlag();
        final Object other$flag = other.getFlag();
        if (this$flag == null ? other$flag != null : !this$flag.equals(other$flag)) return false;
        return true;
    }

    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $tel = this.getTel();
        result = result * PRIME + ($tel == null ? 43 : $tel.hashCode());
        final Object $password = this.getPassword();
        result = result * PRIME + ($password == null ? 43 : $password.hashCode());
        final Object $name = this.getName();
        result = result * PRIME + ($name == null ? 43 : $name.hashCode());
        final Object $gender = this.getGender();
        result = result * PRIME + ($gender == null ? 43 : $gender.hashCode());
        final Object $age = this.getAge();
        result = result * PRIME + ($age == null ? 43 : $age.hashCode());
        final Object $img = this.getImg();
        result = result * PRIME + ($img == null ? 43 : $img.hashCode());
        final Object $flag = this.getFlag();
        result = result * PRIME + ($flag == null ? 43 : $flag.hashCode());
        return result;
    }

    protected boolean canEqual(Object other) {
        return other instanceof User;
    }

    public String toString() {
        return "User(tel=" + this.getTel() + ", password=" + this.getPassword() + ", name=" + this.getName() + ", gender=" + this.getGender() + ", age=" + this.getAge() + ", img=" + this.getImg() + ", flag=" + this.getFlag() + ")";
    }
}