package com.ayou;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Demo {
    public String getUserName(User user) {
        return user.getName()+"888";   // 故意没做 null 检查，BugAgent 应该会发现
    }
    public int getUserAge(User user) {
        return user.getAge()+2;
    }
    public String getUserSex(User user) {
        return user.getSex();
    }
}