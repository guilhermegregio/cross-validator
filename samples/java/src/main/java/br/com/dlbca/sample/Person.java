package br.com.dlbca.sample;

/**
 * Created by guilherme on 19/08/14.
 */
public class Person {
    private String name;
    private String email;

    public Person(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}
