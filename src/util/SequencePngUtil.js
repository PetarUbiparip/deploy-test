import { Color3, StandardMaterial, MeshBuilder } from "@babylonjs/core";

export class SequencePngUtil {

    materialPlane;
    plane;
    frames = [];
    framesSpeed = 1000 / 60;
    currentFrame = 0;
    activePngSequence;

    constructor(scene) {
        this.materialPlane = new StandardMaterial("texturePlane", scene);
        this.materialPlane.specularColor = new Color3(0, 0, 0);

        this.plane = MeshBuilder.CreatePlane("plane", { height: 1, width: 1.77 });
        this.plane.rotation.y = Math.PI;
        this.plane.material = this.materialPlane;
    }


    loopFrames(fromIndex, toIndex) {
        this.hideLayers()

        this.activePngSequence = setInterval(() => {
            // if(this.frames.length > this.currentFrame || this.frames.length < this.currentFrame){
            //     clearInterval( this.activePngSequence);
            //     this.setCurrentFrame(0);
            // }

            // console.log("currentFrame loo",this.currentFrame)
            if (this.currentFrame === toIndex) {
                this.currentFrame = fromIndex;
            }
            this.materialPlane.diffuseTexture = this.frames[this.currentFrame];
            this.currentFrame++;
        }, this.framesSpeed)
    }

    startPngSequenceTex(sequenceStartIndex, sequenceLength, execute, revert = false, loopLength = 0) {
        this.activePngSequence = setInterval(() => {
            // if( this.currentFrame < 0 || this.currentFrame > this.frames.length){
            //     clearInterval(this.activePngSequence);
            //     this.currentFrame = 0
            // }

            // console.log("currentFrame sek",this.currentFrame)
            if (revert) {

                this.materialPlane.diffuseTexture = this.frames[this.currentFrame]
                if (this.currentFrame === sequenceStartIndex - 1) {
                    // this.currentFrame = 0
                    clearInterval(this.activePngSequence);
                    // execute();
                    return
                }
                this.currentFrame--;

            } else {

                if (loopLength && this.currentFrame === loopLength) {
                    this.hideLayers();
                    this.currentFrame = sequenceStartIndex;
                }

                this.materialPlane.diffuseTexture = this.frames[this.currentFrame]
                if (this.currentFrame === sequenceLength + sequenceStartIndex - 1) {
                    console.log(" STOPED loop")
                    clearInterval(this.activePngSequence);
                    return
                }
                this.currentFrame++;
            }
        }, this.framesSpeed)
    }


    addFrames(newFrames) {
        this.frames = this.frames.concat(newFrames);
    }

    hideLayers() {
        this.frames.forEach((layer) => layer.isEnabled = false)
    }
}
