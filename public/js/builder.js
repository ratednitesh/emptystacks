import EditorJS from '@editorjs/editorjs';
import AIText from '@alkhipce/editorjs-aitext'
import Header from '@editorjs/header';

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */
const Paragraph = require('editorjs-paragraph-with-alignment');
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};



export function initBuilder() {
    const editor = new EditorJS({
        /** 
         * Id of Element that should contain the Editor 
         */
        holder: 'builder-chapter',
        placeholder: 'Let`s write an awesome story!',
        autofocus: true,
        /** 
         * Available Tools list. 
         * Pass Tool's class or Settings object for each Tool you want to use 
         */
        tools: {
            header: {
                class: Header,
                inlineToolbar: true
            },
            ai: {
                // if you do not use TypeScript you need to remove "as unknown as ToolConstructable" construction
                // type ToolConstructable imported from @editorjs/editorjs package
                class: AIText,
                config: {
                    // here you need to provide your own suggestion provider (e.g., request to your backend)
                    // this callback function must accept a string and return a Promise<string>
                    callback: (aiText) => {
                        return new Promise(resolve => {
                            const chatSession = model.startChat({
                                generationConfig,
                                // safetySettings: Adjust safety settings
                                // See https://ai.google.dev/gemini-api/docs/safety-settings
                                history: [
                                ],
                            });
                            chatSession.sendMessage(aiText).then(
                                (result) => {
                                    let textResponse = result.response.text();
                                    console.log(textResponse);
                                    resolve(textResponse);
                                }
                            )
                        })
                    },
                }
            },
            paragraph: {
                class: Paragraph,
                inlineToolbar: true,
            },
            // ...
        },
    })
    editor.isReady
        .then(() => {
            console.log('Editor.js is ready to work!')
            /** Do anything you need after editor initialization */
        })
        .catch((reason) => {
            console.log(`Editor.js initialization failed because of ${reason}`)
        });
    console.log('builder loaded');
}