
score = {
    value: 0,
    change: function(size) {
        switch(size) {
            case 2:
                score.value+=10
                break;
            case 1:
                score.value+=5
                break; 
            case 0:
                score.value+=1
                break;   
        }
        // score.value++;
        Game.scoreBox.innerText = `Score: ${score.value}`;
        console.log(size);
    }
}
