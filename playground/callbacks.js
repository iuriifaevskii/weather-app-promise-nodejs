var getUser = (id, callback) => {
    var user = {
        id: id,
        name: 'Yuriy'
    };
    setTimeout(()=>{
        callback(user);
    },3000);
};

console.log('start');
getUser(31, (userObject)=> {
    console.log(userObject);
});
console.log('finish');//AIzaSyBVRw1s3EvMLahPvWulN2MnAK-G5XAEoTg