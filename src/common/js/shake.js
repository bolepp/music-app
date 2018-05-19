let SHAKE_THRESHOLD = 8000
let shake={
	'last_update':0,
	'x':0,
	'y':0,
	'z':0,
	'last_x':0,
	'last_y':0,
	'last_z':0
}
export function deviceMotionHandler(eventData) {
        let acceleration =eventData.accelerationIncludingGravity
        let curTime = new Date().getTime()
        if ((curTime-shake.last_update)> 10) {
            let diffTime = curTime -shake.last_update
            shake.last_update = curTime
            shake.x = acceleration.x
            shake.y = acceleration.y
            shake.z = acceleration.z
            let speed = Math.abs(shake.x +shake.y + shake.z - shake.last_x - shake.last_y - shake.last_z) / diffTime * 10000
            if (speed > SHAKE_THRESHOLD) {
               // Do something
              _this.next()
            }
            shake.last_x = shake.x
            shake.last_y = shake.y
            shake.last_z = shake.z
        }
}