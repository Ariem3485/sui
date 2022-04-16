// @ts-nocheck
import React, { Component } from 'react';
import { ModelViewerElement } from '@google/model-viewer';

class ModelViewComponent extends Component {
    modelViewerRef: React.RefObject<typeof ModelViewerElement>;
    public modelSrc: string;

    constructor(props: any) {
        super(props);
        this.modelViewerRef = React.createRef();
      }

    componentDidMount() {
        this.modelViewerRef.current.title = this.props.title;
        this.modelSrc = this.props.src;

        if (this.props.onShow) {
            this.modelViewerRef.current.addEventListener('show', e =>
            this.props.onShow(e)
            );
        }
    }

    componentDidUpdate(prevProps: any) { }

    render() {
        return (
            <model-viewer ref={this.modelViewerRef}
                bounds="tight" enable-pan
                src={this.modelSrc} ar ar-modes="webxr scene-viewer quick-look"
                camera-controls environment-image="neutral"
                poster="poster.webp" shadow-intensity="1">
            <div className="progress-bar hide" slot="progress-bar">
                <div className="update-bar"></div>
            </div>
            <button slot="ar-button" id="ar-button">
                View in your space
            </button>
            <div id="ar-prompt">
                <img src="ar_hand_prompt.png"/>
            </div>
            </model-viewer>
        );
    }

    handleShow(e: { detail: any; }) {
        this.setState({ show: e.detail });
    }
}

const LIB_CDN = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';

async function loadModelViewer() {
    await import(LIB_CDN).catch(console.error)
}

function fileTypeSupported(url: string): boolean {
    return url.endsWith('.glb') || url.endsWith('.gltf')
}


export { ModelViewComponent, fileTypeSupported };