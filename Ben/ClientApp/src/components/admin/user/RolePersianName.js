import React from 'react';

export function RolePersianName({ role }) {
    console.log(role);
        let persianName = '';
        switch (role) {
            case 'admin':
                persianName = 'مدیرسامانه';
                break;
            case 'judje':
                persianName = 'داور';
                break;
            case 'guest':
                persianName = 'مهمان';
                break;
            default:
                persianName = 'نامشخص';
                break;
        }
        return persianName;
    
}