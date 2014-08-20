package br.com.dlbca.sample;

import org.codehaus.jackson.map.ObjectMapper;
import sun.org.mozilla.javascript.internal.NativeArray;

import javax.script.*;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by guilherme on 19/08/14.
 */
public class Sample {
    public static void main(String[] args) throws ScriptException, IOException {
        ScriptEngineManager engineManager = new ScriptEngineManager();
        ScriptEngine engine = engineManager.getEngineByName("rhino");
        
        Person person = new Person("Guilherme", "email");
        List<String> constrains = new ArrayList<>();
        constrains.add("notEmpty($name)");
        constrains.add("notEmpty($email)");
        constrains.add("isEmail($email)");

        String[] array = new String[constrains.size()];
        constrains.toArray(array);

//        Bindings engineScope = engine.getBindings(ScriptContext.ENGINE_SCOPE);
//        engineScope.put("window", engineScope);

        engine.eval(new FileReader(Sample.class.getResource("/validator.js").getFile()));
        engine.eval("var data = " + new ObjectMapper().writeValueAsString(person));
        engine.eval("var constrains = " + new ObjectMapper().writeValueAsString(constrains));
//        engine.put("constrains", array);
//        engine.eval("var constrains = Java.from(javaConstrains)");
//        engine.eval("var data = Java.from(javaData)");
//
//        engine.eval("constrains.forEach(function(item){print(item)})");
        engine.eval("var validator = new global.Validator(data, constrains);");
        engine.eval("var vResult = validator.validate();");
////
        System.out.println(engine.eval("vResult.hasErrors();"));
        System.out.println(engine.eval("JSON.stringify(vResult.getAllFailures(),null, 4);"));
    }
    
}
