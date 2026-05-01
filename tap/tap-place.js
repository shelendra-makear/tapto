AFRAME.registerComponent('tap-place', {
    init() {
        const ground = document.getElementById('ground')

        this.placedElement = document.createElement('a-entity')

        this.placedElement.setAttribute('visible', 'false')
        this.placedElement.setAttribute('scale', '0.0001 0.0001 0.0001')

        this.placedElement.setAttribute('shadow', {
            receive: false,
        })

        // ✅ Load model
        this.placedElement.setAttribute('gltf-model', '#treeModel')

        // ✅ Play ALL animations from model
        this.placedElement.setAttribute('animation-mixer', {
            clip: '*',
            loop: 'repeat',
        })

        this.el.sceneEl.appendChild(this.placedElement)

        ground.addEventListener('click', (event) => {
            const touchPoint = event.detail.intersection.point

            this.placedElement.setAttribute('position', touchPoint)

            const randomYRotation = Math.random() * 360
            this.placedElement.setAttribute('rotation', `0 ${randomYRotation} 0`)

            // Reset scale for animation
            this.placedElement.setAttribute('scale', '0.0001 0.0001 0.0001')

            setTimeout(() => {
                this.placedElement.setAttribute('visible', 'true')

                this.placedElement.setAttribute('animation', {
                    property: 'scale',
                    to: '1 1 1',
                    easing: 'easeOutElastic',
                    dur: 800,
                })
            }, 50)
        })
    },
})