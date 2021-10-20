export default function translate(id){
    switch(Math.floor(id/100)){
        case 2:
            return '번개'
        case 3:
            return '이슬비'
        case 5:
            return '비'
        case 6:
            return '눈'
        case 7:
            return '안개'
        case 8:
            if(id===800){
                return '맑음'
            }else{
                return '구름'
            }
        default:
            return ''
    }
}