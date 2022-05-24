// @ts-nocheck
// const GigaTester_StringRes = require('./js/stringRes');
// const GigaTester_Icons = require('./js/icons');
// const GigaTester_StringUtils = require('./js/stringUtils');

const GigaTester_Icons = {
    screenshot_icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 117.52" style="enable-background:new 0 0 122.88 117.52" xml:space="preserve"><g><path d="M74.01,0v11.98H19.13c-3.93,0.01-7.14,3.22-7.15,7.15v17.74H0V19.13c0-1.07,0.09-2.09,0.26-3.14 c0.91-5.37,3.99-10,8.56-12.96c3.13-2,6.6-3.01,10.31-3.03H74.01L74.01,0z M106.86,101.52v16H94.87v-16H79.6V89.53h15.27V69.72 h11.98v19.81h16.03v11.98H106.86L106.86,101.52z M0,48.85h11.98v33.53c0.01,2.69,1.52,5.12,3.9,6.36L10.4,99.4 c-3.97-2.06-7.06-5.36-8.84-9.46C0.52,87.51,0.01,85.02,0,82.39V48.85L0,48.85z M24.89,101.52V89.53h42.73v11.98H24.89 L24.89,101.52z M106.85,57.74H94.87V19.13c-0.01-3.93-3.22-7.14-7.15-7.15h-1.73V0h1.73c1.07,0,2.09,0.09,3.14,0.26 c5.37,0.91,10,3.99,12.96,8.56c2,3.13,3.01,6.6,3.03,10.31V57.74L106.85,57.74z"/></g></svg>',
    video_icon: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118.38 122.88"><defs><style>.cls-1{fill:#d8453e;fill-rule:evenodd;}</style></defs><title>screen-recorder</title><path d="M118.38,77v41.87a4,4,0,0,1-4,4H74.5v-9.27h34.63V77ZM81.53,90.36l5,1.49a9.13,9.13,0,0,1-1.57,3.49,6.88,6.88,0,0,1-2.67,2.11,10,10,0,0,1-4,.71,11.76,11.76,0,0,1-4.88-.86,7.78,7.78,0,0,1-3.27-3.06,10.28,10.28,0,0,1-1.38-5.58q0-4.55,2.41-7a9.26,9.26,0,0,1,6.85-2.44,9.25,9.25,0,0,1,5.44,1.41,8.17,8.17,0,0,1,2.94,4.3l-5,1.1a4.43,4.43,0,0,0-.55-1.22,3.21,3.21,0,0,0-2.71-1.34,3.36,3.36,0,0,0-3,1.54,6.7,6.7,0,0,0-.78,3.6q0,3,.93,4.17a3.63,3.63,0,0,0,5,.21,5.42,5.42,0,0,0,1.23-2.64ZM51.27,79.54H66.41v3.91H57v2.91h8.77V90.1H57v3.6H66.7v4.14H51.27V79.54ZM31.88,97.86V79.54h9.43a13.79,13.79,0,0,1,4,.45,4.3,4.3,0,0,1,2.23,1.66,5.06,5.06,0,0,1,.85,3,5.18,5.18,0,0,1-.65,2.63A4.85,4.85,0,0,1,46,89.05a6.82,6.82,0,0,1-2,.72,6,6,0,0,1,1.48.67,6.57,6.57,0,0,1,.9,1,7,7,0,0,1,.79,1.14l2.75,5.28H43.51l-3-5.58a4.33,4.33,0,0,0-1-1.41,2.43,2.43,0,0,0-1.39-.43h-.5v7.42l-5.69,0ZM37.57,87H40a9.36,9.36,0,0,0,1.5-.25,1.49,1.49,0,0,0,.91-.58,1.86,1.86,0,0,0-.2-2.43,3.48,3.48,0,0,0-2.11-.47H37.58V87Zm37-77.8V0h39.86a4,4,0,0,1,4,4V45.9H109.1V9.18ZM9.28,45.84H0V4A4,4,0,0,1,4,0h39.5V9.29H9.28V45.84Zm34.14,67.79v9.25H4a4,4,0,0,1-4-4V77H9.28v36.66H43.42Z"/><path class="cls-1" d="M81.78,46.69c0,11.77-10.82,22.58-22.59,22.58S36.6,58.46,36.6,46.69c0-14.6,11.23-21.93,22.48-22s22.7,7.28,22.7,22ZM59.19,35.46A11.23,11.23,0,1,1,48,46.69,11.22,11.22,0,0,1,59.19,35.46Z"/></svg>',
    bug_icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 116.96 122.88" style="enable-background:new 0 0 116.96 122.88" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M91.53,67.05c0.03,0.85,0.05,1.71,0.05,2.58c0,2.38-0.12,4.71-0.37,6.99l14.92,7.57 c1.58,0.8,2.62,2.26,2.93,3.88l6.36,28.08c0.67,2.97-1.2,5.92-4.17,6.59c-2.97,0.67-5.92-1.2-6.59-4.17l-5.82-25.7l-9.88-5.01 c-4.98,16.53-16.52,28.11-29.96,28.11c-13.52,0-25.11-11.72-30.04-28.41l-10.8,4.9l-4.95,25.94c-0.57,3-3.47,4.96-6.46,4.39 c-3-0.57-4.96-3.47-4.39-6.46l5.47-28.64c0.3-1.75,1.44-3.32,3.17-4.1l15.77-7.16c-0.23-2.24-0.35-4.53-0.35-6.79v-0.01 c0-0.87,0.02-1.74,0.05-2.61L9.83,61.27c-1.74-0.6-2.99-1.99-3.48-3.64l-0.02,0l-6.1-20.21c-0.87-2.92,0.79-6,3.72-6.87 c2.92-0.87,6,0.79,6.87,3.72l5.28,17.5l13.33,4.6l59.22,0l12.21-4.21l5.28-17.5c0.87-2.92,3.95-4.59,6.87-3.72 c2.92,0.87,4.59,3.95,3.72,6.87l-6.1,20.21l-0.02,0c-0.49,1.64-1.74,3.03-3.48,3.63L91.53,67.05L91.53,67.05L91.53,67.05z M58.66,25.55c2.07,0,4.09,0.39,6.03,1.11c0.71-1.57,1.35-3.04,1.94-4.38C72.81,8.23,73.61,6.4,94.9,0.15 c1.99-0.58,4.08,0.56,4.67,2.55c0.59,1.99-0.56,4.08-2.55,4.67c-17.93,5.26-18.57,6.72-23.5,17.95c-0.69,1.56-1.45,3.29-2.35,5.27 c5.61,4.84,10.02,12.84,12.28,22.51l-49.58,0c2.27-9.67,6.67-17.67,12.28-22.51c-0.91-1.98-1.67-3.71-2.35-5.27 c-4.93-11.23-5.58-12.69-23.5-17.95c-1.99-0.58-3.13-2.68-2.55-4.67c0.59-1.99,2.67-3.13,4.67-2.55C43.7,6.4,44.5,8.23,50.68,22.28 c0.59,1.34,1.24,2.81,1.95,4.38C54.56,25.94,56.58,25.55,58.66,25.55L58.66,25.55L58.66,25.55z M67.99,36.6 c2.77,0,5.02,2.25,5.02,5.02c0,2.77-2.25,5.02-5.02,5.02c-2.77,0-5.02-2.25-5.02-5.02C62.97,38.85,65.22,36.6,67.99,36.6 L67.99,36.6z M49.32,36.6c2.77,0,5.02,2.25,5.02,5.02c0,2.77-2.25,5.02-5.02,5.02s-5.02-2.25-5.02-5.02 C44.3,38.85,46.55,36.6,49.32,36.6L49.32,36.6z"/></g></svg>',
    feedback_icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 112.77 122.88" style="enable-background:new 0 0 112.77 122.88" xml:space="preserve"><g><path d="M64.44,61.11c1.79,0,3.12-1.45,3.12-3.12c0-1.78-1.45-3.12-3.12-3.12H24.75c-1.78,0-3.12,1.45-3.12,3.12 c0,1.78,1.45,3.12,3.12,3.12H64.44L64.44,61.11L64.44,61.11L64.44,61.11z M77.45,19.73l18.1-19.14c0.69-0.58,1.39-0.81,2.2-0.35 l14.56,14.1c0.58,0.69,0.69,1.5-0.12,2.31L93.75,36.14L77.45,19.73L77.45,19.73L77.45,19.73L77.45,19.73z M87.74,42.27l-18.66,3.86 l2.36-20.28L87.74,42.27L87.74,42.27z M19.14,13.09h41.73l-3.05,6.45H19.14c-3.48,0-6.65,1.43-8.96,3.73s-3.73,5.46-3.73,8.96 v45.74c0,3.48,1.43,6.66,3.73,8.96c2.3,2.3,5.47,3.73,8.96,3.73h3.72v0.01l0.21,0.01c1.77,0.12,3.12,1.66,2.99,3.43l-1.26,18.1 L48.78,97.7c0.58-0.58,1.38-0.93,2.27-0.93h37.32c3.48,0,6.65-1.42,8.96-3.73c2.3-2.3,3.73-5.48,3.73-8.96V50.45h6.68v42.69 c0.35,9.63-3.58,15.04-19.43,15.7l-32.25-0.74l-32.73,13.87l-0.16,0.13c-1.35,1.16-3.38,1-4.54-0.36c-0.57-0.67-0.82-1.49-0.77-2.3 l1.55-22.34h-0.26c-5.26,0-10.05-2.15-13.52-5.62C2.15,88.03,0,83.24,0,77.98V32.23c0-5.26,2.15-10.05,5.62-13.52 C9.08,15.24,13.87,13.09,19.14,13.09L19.14,13.09L19.14,13.09z M79.69,78.42c1.79,0,3.12-1.45,3.12-3.12 c0-1.79-1.45-3.12-3.12-3.12H24.75c-1.78,0-3.12,1.45-3.12,3.12c0,1.78,1.45,3.12,3.12,3.12H79.69L79.69,78.42L79.69,78.42 L79.69,78.42z M50.39,43.81c1.78,0,3.12-1.45,3.12-3.12c0-1.67-1.45-3.12-3.12-3.12H24.75c-1.78,0-3.12,1.45-3.12,3.12 c0,1.78,1.45,3.12,3.12,3.12H50.39L50.39,43.81L50.39,43.81L50.39,43.81z"/></g></svg>',
    feature_req_icon: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 91.29"><path class="cls-1" d="M2.17,38H22.66a2.18,2.18,0,0,1,2.17,2.17V80a2.18,2.18,0,0,1-2.17,2.18H2.17A2.18,2.18,0,0,1,0,80V40.18A2.18,2.18,0,0,1,2.17,38ZM29.83,78.48V41.56H46.44c7,1.26,14.08,5.08,21.12,9.51h12.9c5.84.35,8.89,6.27,3.22,10.16-4.52,3.31-10.49,3.13-16.6,2.58-4.22-.21-4.41,5.46,0,5.48,1.52.12,3.18-.24,4.64-.24,7.63,0,13.92-1.47,17.77-7.5L91.42,57l19.19-9.52c9.6-3.16,16.42,6.89,9.35,13.87A251.41,251.41,0,0,1,77.23,86.54c-10.58,6.44-21.17,6.22-31.76,0L29.83,78.48ZM98.1,24.28a1.08,1.08,0,0,0-1.53.27l-1,1.37a7,7,0,0,0-1.09-.36c-.38-.09-.74-.17-1.13-.23l-.3-1.8a1.16,1.16,0,0,0-.44-.71,1.05,1.05,0,0,0-.83-.17l-2.25.4a1.17,1.17,0,0,0-.71.44,1,1,0,0,0-.19.83L88.93,26a7.18,7.18,0,0,0-1,.54,7.83,7.83,0,0,0-.94.65l-1.53-1a1,1,0,0,0-.8-.19,1.07,1.07,0,0,0-.71.46l-1.3,1.85a1,1,0,0,0-.19.83,1,1,0,0,0,.46.7l1.37,1a6.33,6.33,0,0,0-.36,1.09A11.32,11.32,0,0,0,83.67,33l-1.8.31a1.09,1.09,0,0,0-.71.44,1,1,0,0,0-.17.82l.4,2.26a1.13,1.13,0,0,0,.44.71,1.06,1.06,0,0,0,.83.19l1.64-.29a6.3,6.3,0,0,0,.54,1,9,9,0,0,0,.65,1l-1.06,1.51a1.07,1.07,0,0,0-.19.81,1.11,1.11,0,0,0,.46.7l1.88,1.32a1.05,1.05,0,0,0,.82.18,1.17,1.17,0,0,0,.73-.44l1-1.4a6.44,6.44,0,0,0,1.1.36,8.91,8.91,0,0,0,1.12.23l.31,1.8a1.11,1.11,0,0,0,.44.71,1,1,0,0,0,.82.17l2.26-.4a1.13,1.13,0,0,0,.71-.44,1,1,0,0,0,.19-.82L95.77,42a6.68,6.68,0,0,0,1-.53c.33-.2.65-.43,1-.65l1.51,1a1,1,0,0,0,.82.19,1.06,1.06,0,0,0,.71-.46l1.32-1.88a1,1,0,0,0,.17-.82,1.15,1.15,0,0,0-.44-.73l-1.4-.95a6.46,6.46,0,0,0,.37-1.1,11.13,11.13,0,0,0,.23-1.12l1.8-.31a1.16,1.16,0,0,0,.71-.44,1,1,0,0,0,.17-.82l-.4-2.26a1.17,1.17,0,0,0-.44-.71,1.06,1.06,0,0,0-.83-.19l-1.64.28a10.19,10.19,0,0,0-.54-1,7.11,7.11,0,0,0-.65-.94l1-1.53a1,1,0,0,0,.2-.8,1.14,1.14,0,0,0-.46-.71l-1.86-1.3-.06,0ZM78,5.86a2.6,2.6,0,0,1,.78.73l2,2.8h0a2.84,2.84,0,0,1,.44.95,2.53,2.53,0,0,1,0,1.06,2.73,2.73,0,0,1-.37,1,2.38,2.38,0,0,1-.74.74l-1.66,1.21a.94.94,0,0,0,0,.16c.08.29.14.59.21.88a.43.43,0,0,1,0,0,8.05,8.05,0,0,1,.15.94l0,.11,1.74.29a2.6,2.6,0,0,1,1.76,1.1v0a2.47,2.47,0,0,1,.43.95,2.65,2.65,0,0,1,0,1.05l-.56,3.45a2.61,2.61,0,0,1-1.09,1.78,2.65,2.65,0,0,1-1,.44,2.7,2.7,0,0,1-1.06,0l-2-.33c0,.05-.07.11-.09.15-.16.27-.33.53-.51.8s-.36.54-.54.77l-.07.09,1,1.42,0,.06a2.48,2.48,0,0,1,.41,1,2.64,2.64,0,0,1,0,1.05,2.72,2.72,0,0,1-.36,1,2.75,2.75,0,0,1-.7.79l0,0-2.82,2a2.83,2.83,0,0,1-1,.46,2.44,2.44,0,0,1-1.08,0,3,3,0,0,1-1-.37,2.59,2.59,0,0,1-.76-.75l-1.18-1.65a.41.41,0,0,1-.16,0c-.29.07-.6.15-.92.21s-.62.11-.94.16a.29.29,0,0,1-.13,0l-.28,1.73a2.44,2.44,0,0,1-.38,1,2.48,2.48,0,0,1-.72.76l0,0a2.71,2.71,0,0,1-.95.43,2.85,2.85,0,0,1-1.05,0l-3.45-.57a2.6,2.6,0,0,1-1.78-1.08,2.65,2.65,0,0,1-.44-1,2.69,2.69,0,0,1,0-1.06l.34-2a.75.75,0,0,1-.15-.09l-.8-.5c-.28-.2-.54-.37-.77-.55l-.09-.07-1.42,1-.06,0a2.48,2.48,0,0,1-1,.41,2.64,2.64,0,0,1-1.05,0,2.77,2.77,0,0,1-1-.36,3,3,0,0,1-.78-.69l0,0-2-2.86a2.84,2.84,0,0,1-.44-1,2.52,2.52,0,0,1,0-1.06,2.79,2.79,0,0,1,.37-1,3.18,3.18,0,0,1,.75-.76l1.65-1.17a.51.51,0,0,1,0-.17c-.07-.29-.15-.6-.21-.92s-.13-.62-.16-.93V20l-1.73-.28a2.68,2.68,0,0,1-1-.37,2.77,2.77,0,0,1-.76-.73v0a2.47,2.47,0,0,1-.43-1,2.85,2.85,0,0,1,0-1l.56-3.45a2.64,2.64,0,0,1,1.09-1.78,2.65,2.65,0,0,1,1-.44,2.7,2.7,0,0,1,1.06,0l2,.33.09-.15c.16-.27.33-.53.51-.8s.36-.54.55-.77l.06-.09L52.45,8A2.58,2.58,0,0,1,52,7,2.58,2.58,0,0,1,52,6a2.55,2.55,0,0,1,.38-1,2.59,2.59,0,0,1,.73-.78l2.8-2v0a3,3,0,0,1,1-.44,2.52,2.52,0,0,1,1.06,0,2.79,2.79,0,0,1,1,.37,2.61,2.61,0,0,1,.74.74l1.21,1.67L61,4.39l.91-.22c.31-.07.62-.11.94-.16,0,0,.08,0,.13,0l.28-1.73a2.44,2.44,0,0,1,.38-1,2.51,2.51,0,0,1,.73-.76v0a2.79,2.79,0,0,1,.95-.43,3.08,3.08,0,0,1,1.05,0L69.83.6a2.92,2.92,0,0,1,1,.36,2.44,2.44,0,0,1,.77.73,2.63,2.63,0,0,1,.45,1,3,3,0,0,1,0,1.07l-.33,2,.15.08.79.51c.28.19.54.37.78.55l.08.06,1.44-1a2.45,2.45,0,0,1,1-.44,2.71,2.71,0,0,1,1.06,0,2.54,2.54,0,0,1,1,.38v0Zm-11.2,7a5.77,5.77,0,0,0-1.14-.3,6.58,6.58,0,0,0-1.17-.08,7.09,7.09,0,0,0-1.07.14l-.07,0a5.72,5.72,0,0,0-1.08.38,5.19,5.19,0,0,0-1,.54,4.76,4.76,0,0,0-.82.73,6,6,0,0,0-.71.91,6.18,6.18,0,0,0-.51,1,5.88,5.88,0,0,0-.37,2.31A6.83,6.83,0,0,0,59,19.57a.64.64,0,0,1,0,.07,6.09,6.09,0,0,0,.38,1.09,5.19,5.19,0,0,0,.54.95,4.76,4.76,0,0,0,.73.82,5.35,5.35,0,0,0,.91.7,5.49,5.49,0,0,0,1,.51,6.14,6.14,0,0,0,2.31.38A7.12,7.12,0,0,0,66,24s0,0,.06,0a6.2,6.2,0,0,0,2-.92,5.22,5.22,0,0,0,.82-.73,5.78,5.78,0,0,0,.7-.91,5.49,5.49,0,0,0,.51-1,5.16,5.16,0,0,0,.3-1.14A5.12,5.12,0,0,0,70.54,18,7.12,7.12,0,0,0,70.41,17s0,0,0-.07A5.72,5.72,0,0,0,70,15.82a6.41,6.41,0,0,0-.54-1,5.7,5.7,0,0,0-.73-.82,6.62,6.62,0,0,0-.91-.7,7.06,7.06,0,0,0-1-.51Zm-2-4.53a9.95,9.95,0,1,1-9.94,10A9.95,9.95,0,0,1,64.75,8.3ZM91.54,29.6a4.45,4.45,0,0,1,1.78,0,4.51,4.51,0,0,1,1.57.69,4.37,4.37,0,0,1,1.18,1.24,4,4,0,0,1,.63,1.65,4.64,4.64,0,0,1,0,1.78A4.91,4.91,0,0,1,96,36.57a4.7,4.7,0,0,1-1.25,1.18,4,4,0,0,1-1.64.63,4.44,4.44,0,0,1-1.78,0,4.6,4.6,0,0,1-1.57-.68,4.74,4.74,0,0,1-1.19-1.25,4.37,4.37,0,0,1-.63-1.64A4.84,4.84,0,0,1,88,33a4.62,4.62,0,0,1,.69-1.57,4.69,4.69,0,0,1,1.24-1.19,4.36,4.36,0,0,1,1.65-.63ZM12.42,44.72A3.23,3.23,0,1,1,9.19,48a3.22,3.22,0,0,1,3.23-3.23Z"/></svg>',
    mic_icon: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82.05 122.88"><path d="M59.89,20.83V52.3c0,27-37.73,27-37.73,0V20.83c0-27.77,37.73-27.77,37.73,0Zm-14.18,76V118.2a4.69,4.69,0,0,1-9.37,0V96.78a40.71,40.71,0,0,1-12.45-3.51A41.63,41.63,0,0,1,12.05,85L12,84.91A41.31,41.31,0,0,1,3.12,71.68,40.73,40.73,0,0,1,0,56a4.67,4.67,0,0,1,8-3.31l.1.1A4.68,4.68,0,0,1,9.37,56a31.27,31.27,0,0,0,2.4,12.06A32,32,0,0,0,29,85.28a31.41,31.41,0,0,0,24.13,0,31.89,31.89,0,0,0,10.29-6.9l.08-.07a32,32,0,0,0,6.82-10.22A31.27,31.27,0,0,0,72.68,56a4.69,4.69,0,0,1,9.37,0,40.65,40.65,0,0,1-3.12,15.65A41.45,41.45,0,0,1,70,85l-.09.08a41.34,41.34,0,0,1-11.75,8.18,40.86,40.86,0,0,1-12.46,3.51Z"/></svg>',
    play_icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 122.88" style="enable-background:new 0 0 122.88 122.88" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M61.44,0c33.93,0,61.44,27.51,61.44,61.44s-27.51,61.44-61.44,61.44S0,95.37,0,61.44S27.51,0,61.44,0L61.44,0z M83.31,65.24c3.13-2.02,3.12-4.27,0-6.06L50.98,40.6c-2.55-1.6-5.21-0.66-5.14,2.67l0.1,37.55c0.22,3.61,2.28,4.6,5.32,2.93 L83.31,65.24L83.31,65.24z M61.44,12.48c27.04,0,48.96,21.92,48.96,48.96c0,27.04-21.92,48.96-48.96,48.96S12.48,88.48,12.48,61.44 C12.48,34.4,34.4,12.48,61.44,12.48L61.44,12.48z"/></g></svg>',
    pause_icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 122.88" style="enable-background:new 0 0 122.88 122.88" xml:space="preserve"><g><path d="M61.44,0c16.97,0,32.33,6.88,43.44,18c11.12,11.12,18,26.48,18,43.44c0,16.97-6.88,32.33-18,43.44 c-11.12,11.12-26.48,18-43.44,18c-16.97,0-32.33-6.88-43.44-18C6.88,93.77,0,78.41,0,61.44C0,44.47,6.88,29.11,18,18 C29.11,6.88,44.47,0,61.44,0L61.44,0z M42.3,39.47h13.59v43.95l-13.59,0V39.47L42.3,39.47L42.3,39.47z M66.99,39.47h13.59v43.95 l-13.59,0V39.47L66.99,39.47L66.99,39.47z M97.42,25.46c-9.21-9.21-21.93-14.9-35.98-14.9c-14.05,0-26.78,5.7-35.98,14.9 c-9.21,9.21-14.9,21.93-14.9,35.98s5.7,26.78,14.9,35.98c9.21,9.21,21.93,14.9,35.98,14.9c14.05,0,26.78-5.7,35.98-14.9 c9.21-9.21,14.9-21.93,14.9-35.98S106.63,34.66,97.42,25.46L97.42,25.46z"/></g></svg>',
    stop_icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 493.56 493.56"><path d="M438.254,0H58.974C27.502,0,0.006,25.992,0.006,57.472v379.256c0,31.48,27.496,56.832,58.968,56.832h379.28 c31.468,0,55.3-25.352,55.3-56.832V57.472C493.554,25.992,469.722,0,438.254,0z"/></svg>',
    square_filled_icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 493.56 493.56"><path d="M438.254,0H58.974C27.502,0,0.006,25.992,0.006,57.472v379.256c0,31.48,27.496,56.832,58.968,56.832h379.28 c31.468,0,55.3-25.352,55.3-56.832V57.472C493.554,25.992,469.722,0,438.254,0z"/></svg>',
    square_outline_icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.661px" height="122.88px" viewBox="0 0 122.661 122.88" enable-background="new 0 0 122.661 122.88" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M21.26,0h80.142c11.692,0,21.26,9.706,21.26,21.569v79.741 c0,11.864-9.567,21.569-21.26,21.569H21.26C9.566,122.88,0,113.175,0,101.311V21.569C0,9.706,9.566,0,21.26,0L21.26,0z M21.674,11.14h79.312c5.855,0,10.647,4.788,10.647,10.641v79.313c0,5.855-4.792,10.646-10.647,10.646H21.674 c-5.855,0-10.646-4.79-10.646-10.646V21.78C11.027,15.928,15.818,11.14,21.674,11.14L21.674,11.14z"/></g></svg>',
    paperclip_icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.877px" height="112.531px" viewBox="0 0 122.877 112.531" enable-background="new 0 0 122.877 112.531" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M8.872,8.869L8.872,8.869C-2.956,20.694-2.958,40.039,8.87,51.864L53.433,96.43 c4.873,0.274,7.517-1.769,7.055-7.055L16.287,45.172c-7.945-7.945-7.945-20.941,0-28.887l0,0 c7.943-7.942,20.943-7.945,28.889-0.002c21.27,21.27,42.542,42.543,63.807,63.81c5.035,5.032,5.318,13.691,0.279,18.73l0,0 c-5.035,5.036-13.656,4.721-18.693-0.315C74.424,82.364,58.402,66.342,42.256,50.197c-2.235-2.235-2.349-6.006-0.113-8.245l0,0 c2.234-2.236,6.009-2.12,8.245,0.113L79.092,70.77c5.201,0.411,7.434-2.138,7.182-7.181L57.569,34.884 c-6.188-6.188-16.308-6.188-22.492-0.002l0,0c-6.19,6.188-6.184,16.315-0.002,22.496l19.662,19.664l9.269,9.27l19.201,19.199 c8.977,8.978,24.23,9.54,33.207,0.56c8.982-8.981,8.422-24.23-0.559-33.21L87.387,44.392v0.002L51.862,8.869 C40.039-2.958,20.693-2.954,8.872,8.869L8.872,8.869z"/></g></svg>',
    tick_mark_icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="52.881px" height="20.842px" viewBox="0 0 122.881 89.842" enable-background="new 0 0 122.881 89.842" xml:space="preserve"><g><path d="M1.232,55.541c-1.533-1.388-1.652-3.756-0.265-5.289c1.388-1.534,3.756-1.652,5.29-0.265l34.053,30.878l76.099-79.699 c1.429-1.501,3.804-1.561,5.305-0.132c1.502,1.428,1.561,3.803,0.133,5.305L43.223,88.683l-0.005-0.005 c-1.396,1.468-3.716,1.563-5.227,0.196L1.232,55.541L1.232,55.541z"/></g></svg>',
    check_mark_icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.877px" height="101.052px" viewBox="0 0 122.877 101.052" enable-background="new 0 0 122.877 101.052" xml:space="preserve"><g><path d="M4.43,63.63c-2.869-2.755-4.352-6.42-4.427-10.11c-0.074-3.689,1.261-7.412,4.015-10.281 c2.752-2.867,6.417-4.351,10.106-4.425c3.691-0.076,7.412,1.255,10.283,4.012l24.787,23.851L98.543,3.989l1.768,1.349l-1.77-1.355 c0.141-0.183,0.301-0.339,0.479-0.466c2.936-2.543,6.621-3.691,10.223-3.495V0.018l0.176,0.016c3.623,0.24,7.162,1.85,9.775,4.766 c2.658,2.965,3.863,6.731,3.662,10.412h0.004l-0.016,0.176c-0.236,3.558-1.791,7.035-4.609,9.632l-59.224,72.09l0.004,0.004 c-0.111,0.141-0.236,0.262-0.372,0.368c-2.773,2.435-6.275,3.629-9.757,3.569c-3.511-0.061-7.015-1.396-9.741-4.016L4.43,63.63 L4.43,63.63z"/></g></svg>',
    close_icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.878px" height="122.88px" viewBox="0 0 122.878 122.88" enable-background="new 0 0 122.878 122.88" xml:space="preserve"><g><path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z"/></g></svg>',
    cross_icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="121.31px" height="122.876px" viewBox="0 0 121.31 122.876" enable-background="new 0 0 121.31 122.876" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M90.914,5.296c6.927-7.034,18.188-7.065,25.154-0.068 c6.961,6.995,6.991,18.369,0.068,25.397L85.743,61.452l30.425,30.855c6.866,6.978,6.773,18.28-0.208,25.247 c-6.983,6.964-18.21,6.946-25.074-0.031L60.669,86.881L30.395,117.58c-6.927,7.034-18.188,7.065-25.154,0.068 c-6.961-6.995-6.992-18.369-0.068-25.397l30.393-30.827L5.142,30.568c-6.867-6.978-6.773-18.28,0.208-25.247 c6.983-6.963,18.21-6.946,25.074,0.031l30.217,30.643L90.914,5.296L90.914,5.296z"/></g></svg>',
    star_icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 117.1"><path class="star" fill="#042e5b" d="M64.42,2,80.13,38.7,120,42.26a3.2,3.2,0,0,1,1.82,5.62h0L91.64,74.18l8.9,39A3.19,3.19,0,0,1,98.12,117a3.27,3.27,0,0,1-2.46-.46L61.41,96.1,27.07,116.64a3.18,3.18,0,0,1-4.38-1.09,3.14,3.14,0,0,1-.37-2.38h0l8.91-39L1.09,47.88a3.24,3.24,0,0,1-.32-4.52,3.32,3.32,0,0,1,2.29-1l39.72-3.56L58.49,2a3.24,3.24,0,0,1,5.93,0Z"/></svg>',
    trash_bin_icon: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 105.7 122.88"><title>trash-bin</title><path d="M30.46,14.57V5.22A5.18,5.18,0,0,1,32,1.55v0A5.19,5.19,0,0,1,35.68,0H70a5.22,5.22,0,0,1,3.67,1.53l0,0a5.22,5.22,0,0,1,1.53,3.67v9.35h27.08a3.36,3.36,0,0,1,3.38,3.37V29.58A3.38,3.38,0,0,1,102.32,33H98.51l-8.3,87.22a3,3,0,0,1-2.95,2.69H18.43a3,3,0,0,1-3-2.95L7.19,33H3.37A3.38,3.38,0,0,1,0,29.58V17.94a3.36,3.36,0,0,1,3.37-3.37Zm36.27,0V8.51H39v6.06ZM49.48,49.25a3.4,3.4,0,0,1,6.8,0v51.81a3.4,3.4,0,1,1-6.8,0V49.25ZM69.59,49a3.4,3.4,0,1,1,6.78.42L73,101.27a3.4,3.4,0,0,1-6.78-.43L69.59,49Zm-40.26.42A3.39,3.39,0,1,1,36.1,49l3.41,51.8a3.39,3.39,0,1,1-6.77.43L29.33,49.46ZM92.51,33.38H13.19l7.94,83.55H84.56l8-83.55Z"/></svg>',
    delete_image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADZUlEQVRogdWaz0sUYRjHP9UhSKpDJfRDKjz0gxDMy7YgeghhkWUPKxjRVtAqoYW7RD9IL1HQdovoFqH9C0EEXeoSZREdsiIoo1sZQTlRq5UTzzIT4zaj8777jo5feFCQ99nPd+bxfZ55Z5dhRluBJLDHie3AOmC1k/078AX4AIwBL4BHwLihz9fSGuAEcA+YAWyNuA8UHbMLpg3AFeeK6kD7xTfgKrApahMFYNIgeHX8BM5GAS41/SBC8OoYBXaagk8BPxYQ3o1fQLZW+COLAF4d/brwh2MA70afKvz+GMG7kQkLXw/8jqEBiW1hDDyLKbzEm/ng+2MM78Z5L7B3FloFWMDysLW2iFrvTAKzYC8sEXjRZfeXFc7PlcBtVQONjY3k83nq6uoYH1cbLFtbW+nu7sayLCYmJpTWAi3AdWf0qOi4ai02NTXZlmXZrgYGBkKvzefz/9aVy2U7kUjo/C+c8jp6qJqgVCrZ1SoUCkrwroaHh3UMjLnwG3V2g46Ojv9ARMViMXBNb2+v75quri7dHUkepDiou6VJ2fjJr5z8rrxocHBQF17iqBgo1ZAg0IS3nILgh4aGaoGXuCkG7tSYpALrp2w2a6dSqajgbee5mpcGEgWaiBBe4q0Y+GgoWWA5RQQv8RlnfDCWNJPJVPb2ak1NTdm5XM4kvIRlfHSQzmrbtu/fJicnTX9c5YM+mboiQbuNV2GanWoJvTKRLKhJ+WmuZqcY78TA3aiuvNS8dFk/qcxOc8RjnFM24/De3SZMs9OMYTFwSDdBT09P6K0yqE/UaOKYGNiis7i9vT00/Hwm0um0roFGdzsaVV3sN06HaVJ+5TQyMqIDP+sB/6RqgpaWFnt6eloJ3u9OzMzM2G1tbToGznkNyAP9H9Ukzc3NlTshQ5vq2s7OzsraZDKpWz711V3tmmaixYhbLrT3WGUt8NVkn49QG50hdNYphLwlObME4C+58EEai3HpvA/jsCHGBnaEvU3pGMIfUK21vhjBn1aFdxWH0+qaN5YunSZnKHK1wrvaDTxdQHD5KsJeU/BeDQFTEYLLnb4YBbhXDc7RdtkguLyTu+EdjxdCm50j7ic1gD93pspQL+/8ZOrrNtJgEsA+YJczq8i3WWTKFcmLCDlTkROQ186RoDzPyoGCvoC/pkcwDQU7NiIAAAAASUVORK5CYII=",
    image_icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.88px" height="122.151px" viewBox="0 0 122.88 122.151" enable-background="new 0 0 122.88 122.151" xml:space="preserve"><g><path d="M8.676,0h105.529c2.405,0,4.557,0.984,6.124,2.552c1.567,1.567,2.551,3.754,2.551,6.124v104.8 c0,2.405-0.983,4.557-2.551,6.124c-1.568,1.567-3.755,2.552-6.124,2.552H8.676c-2.406,0-4.557-0.984-6.124-2.553 C0.984,118.032,0,115.845,0,113.476V8.675C0,6.27,0.984,4.119,2.552,2.552C4.12,0.984,6.307,0,8.676,0L8.676,0z M9.097,88.323 l35.411-33.9c1.421-1.313,3.645-1.167,4.921,0.255c0.037,0.036,0.037,0.073,0.073,0.073l31.459,37.218l4.812-29.6 c0.328-1.896,2.114-3.208,4.01-2.879c0.729,0.109,1.385,0.474,1.895,0.948l22.07,23.184V10.773c0-0.474-0.183-0.875-0.511-1.166 c-0.291-0.292-0.729-0.511-1.166-0.511H10.737c-0.474,0-0.875,0.182-1.166,0.511c-0.292,0.291-0.511,0.729-0.511,1.166v77.55H9.097 L9.097,88.323z M90.526,19.866c3.464,0,6.635,1.422,8.895,3.682c2.297,2.296,3.682,5.431,3.682,8.895 c0,3.463-1.421,6.634-3.682,8.894c-2.296,2.297-5.431,3.682-8.895,3.682c-3.462,0-6.634-1.421-8.894-3.682 c-2.297-2.296-3.682-5.431-3.682-8.894c0-3.463,1.421-6.634,3.682-8.895C83.929,21.251,87.064,19.866,90.526,19.866L90.526,19.866z"/></g></svg>',
};

const GigaTester_StringRes = {
    locale: "en",
    en: {
        report_bug: "Report Issue",
        report_bug_msg: "Tell us your concern",
        give_feedback: "Give Feedback",
        give_feedback_msg: "Tell us your experience",
        request_feature: 'Request Feature',
        request_feature_msg: 'What can we improve?',
        draw_hint: "Click & drag to draw or click to add a comment",
        capture_screen_recording: "Screen Recorder",
        capture_audio: "Capture audio",
        attach_screenshot: "Screenshot",
        attach_file: "Attach a file",
        attachment_msg: "Click the buttons below to include an attachment",
        your_email: "Your email",
        select_category: "Select a category *",
        select_severity: "Choose severity *",
        your_comment: "Provide your comments",
        screenshot_attached: "Screenshot attached",
        send: "Send feedback",
        close: "Close",
        rectangle: "Mark an area in screenshot",
        blackout: "Hide an area in screenshot",
        color_palette: "choose color",
        capture: "Capture",
        capture_screenshot: "Attach annoted screenshot to feedback",
        discard_screenshot: "Discard screenshot",
        save: "Save",
        delete: "Delete",
        add_comment: "Type your comment",
        cancel: "Cancel",
        unsaved_changes: "You have unsaved changes",
        confirm_close: "Are you sure that you want to close?",
        discard: "Discard",
        start_recording: "Start recording",
        screen_recording: "Screen recording",
        recording_mute: "Turn off microphone",
        recording_unmute: "Turn on microphone",
        recording_pause: "Pause",
        recording_resume: "Resume",
        recording_finish: "Finish recording",
        remaining_time: "Remaining Time",
        ok: "OK",
        media_upload_success: "Media uploaded successfuly.",
        submitting_feedback: "Submitting feedback form.",
        upload_media_error: "Error uploading media. Please try again.",
        form_submit_error: "Error submitting feedback form. Please try again.",
        thank_you_text: "Thank You!",
        thank_you_bug_msg: "We will resolve your concern.",
        thank_you_feedback_msg: "We appreciate your feedback.",
        confirm_modal_header: "Confirm",
        confirm_modal_text: "Start afresh next time or Start from these values next time",
        keep_changes_button: "Keep changes",
        discard_changes_button: "Discard changes"
    },
    setLocale: function(locale) {
        this.locale = locale
    },
    get: function(key, include_fallback) {
        if (!GigaTester_StringRes[GigaTester_StringRes.locale]) {
            GigaTester_StringRes.locale = "en"
        }
        if (GigaTester_StringRes[GigaTester_StringRes.locale][key]) {
            return GigaTester_StringRes[GigaTester_StringRes.locale][key]
        } else {
            if (include_fallback) {
                return GigaTester_StringRes["en"][key] || ""
            } else {
                return ""
            }
        }
    }
};

let GigaTester_StringUtils = {
    escapeSpecialChars: function(str, nl2br) {
        let text = String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
        if (nl2br) {
            text = text.replace(/(?:\r\n|\r|\n)/g, "<br>")
        }
        return text
    },
};

(function() {
    if(typeof window.jQuery === "undefined"){
        (function(d) {
            let s = d.createElement('script');s.sync = true;
            s.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
            (d.head || d.body).appendChild(s);
        })(document);
    }
    if(typeof window.platform === "undefined"){
        (function(d) {
            let s = d.createElement('script');s.async = true;
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/platform/1.3.6/platform.min.js';
            (d.head || d.body).appendChild(s);
        })(document);
     }
    if(typeof window.Snap === "undefined"){
        (function(d) {
            let s = d.createElement('script');s.async = true;
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.5.1/snap.svg-min.js';
            (d.head || d.body).appendChild(s);
        })(document);
     }
     if(typeof window.html2canvas === "undefined"){
        (function(d) {
            let s = d.createElement('script');s.async = true;
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.3/html2canvas.min.js';
            (d.head || d.body).appendChild(s);
        })(document);
     }

    console.log('GigaTester: dependency loading');


    function gigatester(){
    if(typeof window.jQuery === "undefined" && typeof window.html2canvas === "undefined"  && typeof window.platform === "undefined" &&  typeof window.Snap === "undefined"){
        console.log('GigaTester: inside giga timeout')
    }
    else{
        try{
        (function($) {
            "use strict";
            console.log('GigaTester: inside main function');
            if (typeof window.GigaTester === "undefined") {
                window.GigaTester = {}
            }

            //this is the object that deals with the comments provided on the screenshot object
            let GigaTester_ScreenshotComment = function(options) {
                this.is_new = true;
                this.x = options.x;
                this.y = options.y;
                this.counter = options.counter;
                this.screenshot_num = options.screenshot_num;
                this.onDelete = options.onDelete;
                this.onOpen = options.onOpen;
                this.scroll_t = options.scroll_t;
                this.scroll_l = options.scroll_l;
                this.offset_x = options.offset_x;
                this.offset_y = options.offset_y;
                this.is_mobile = options.is_mobile;
                let element = $("<div>").addClass("gigatester-comment");
                let canvas_comment_message = "";
                element.on("click mouseup mousedown", function(e) {
                    e.stopPropagation()
                });
                element.on("keydown keyup", function(e) {
                    e.stopPropagation()
                });
                this.setHTML = function() {
                    return '<div class="gigatester-comment-pin" style="background-color:' + GigaTester_modal.Draw_Tools.color.value + ';" ><span>' + (this.counter + 1) + "</span></div>" + '<form class="gigatester-comment-form">' + '<gtcomment class="gtmousescroll" contenteditable="true" data-ph="' + GigaTester_StringRes.get("add_comment") + '" gramm_editor="false"></gtcomment>' + '<btn class="gigatester-input-btn gigatester-btn-save">' + GigaTester_StringRes.get("save") + "</btn>" + '<btn class="gigatester-comment-form-delete" title="' + GigaTester_StringRes.get("delete") + '">' + GigaTester_Icons.trash_bin_icon + "</btn>" + '<btn class="gigatester-comment-form-close" title="' + GigaTester_StringRes.get("close") + '">' + GigaTester_Icons.close_icon + "</btn>" + "</form>"
                };
                this.isOpen = function() {
                    return element.find(".gigatester-comment-form").is(":visible")
                };
                this.isEmpty = function() {
                    return canvas_comment_message ? false : true
                };
                this.setCounter = function(counter) {
                    this.counter = counter;
                    element.find(".gigatester-comment-pin > span").text(counter + 1)
                };
                this.submit = function() {
                    element.find(".gigatester-input-btn").click();
                };
                this.show = function() {
                    element.show()
                };
                this.hide = function() {
                    element.hide()
                };
                this.showForm = function() {
                    element.find(".gigatester-comment-form").show();
                    element.find("gtcomment").html(GigaTester_StringUtils.escapeSpecialChars(canvas_comment_message, true)).focus()
                };
                this.hideForm = function() {
                    element.find(".gigatester-comment-form-delete").show();
                    element.find(".gigatester-comment-form").hide()
                };
                this.saveComment = function(){
                    element.find(".gigatester-btn-save").trigger('click');
                }
                this.saveCanvasComments = function() {
                    element.find(".gigatester-btn-save").trigger('click');
                    console.log('set position')
                };
                this.setFormDirection = function() {
                    let form_width = this.is_mobile ? 210 : 430;
                    let form_height = this.is_mobile ? 150 : 200;
                    if (this.is_mobile) {
                        if (this.x > $(window).width() / 2) {
                            element.find(".gigatester-comment-form").attr("xdirection", "left")
                        } else {
                            element.find(".gigatester-comment-form").attr("xdirection", "right")
                        }
                        if (this.y > 140) {
                            element.find(".gigatester-comment-form").attr("ydirection", "top")
                        } else {
                            element.find(".gigatester-comment-form").attr("ydirection", "down")
                        }
                    } else {
                        if ($(window).scrollLeft() + $(window).width() - this.x >= form_width) {
                            element.find(".gigatester-comment-form").attr("xdirection", "right")
                        } else {
                            element.find(".gigatester-comment-form").attr("xdirection", "left")
                        }
                        if ($(window).scrollTop() + $(window).height() - this.y >= form_height) {
                            element.find(".gigatester-comment-form").attr("ydirection", "down")
                        } else {
                            element.find(".gigatester-comment-form").attr("ydirection", "top")
                        }
                    }
                };
                this.add = function() {
                    element.css({
                        top: this.y,
                        left: this.x
                    });
                    element.html(this.setHTML());
                    this.setFormDirection();
                    element.find(".gigatester-comment-pin").on("click", function(e) {
                        this.showForm();
                        this.onOpen(this.counter)
                    }.bind(this));
                    element.find(".gigatester-comment-form-close").on("click", function(e) {
                        e.stopPropagation();
                        if (this.is_new) {
                            this.destroy();
                            this.onDelete(this.counter);
                            return
                        }
                        this.hideForm()
                    }.bind(this));
                    element.find(".gigatester-comment-form-delete").on("click", function(e) {
                        e.stopPropagation();
                        this.destroy();
                        this.onDelete(this.counter)
                    }.bind(this));
                    element.find("gtcomment").on("keydown", function(e) {
                        if (e.which === 13) {
                            if (e.ctrlKey || e.metaKey) {
                                element.find('button[type="submit"]').on('click')
                            }
                        }
                    });
                    element.find("gtcomment").on("keyup", function(e) {
                        if ($(this).html() === "<br>") {
                            $(this).html("")
                        }
                    });
                    element.find("gtcomment").on("paste", function(e) {
                        e.preventDefault();
                        try {
                            let text = (e.originalEvent || e).clipboardData.getGigaData("text/plain");
                            document.execCommand("insertText", false, text)
                        } catch (e) {}
                    });
                    element.find(".gigatester-btn-save").on("click", function(e) {
                        canvas_comment_message = element.find("gtcomment").html();
                        canvas_comment_message = canvas_comment_message.replace(/<br\/?>/gi, "\n");
                        canvas_comment_message = canvas_comment_message.replace(/(<([^>]+)>)/gi, "");
                        canvas_comment_message = canvas_comment_message.replace(/&nbsp;/gi, " ");
                        canvas_comment_message = canvas_comment_message.replace(/&lt;/gi, "<");
                        canvas_comment_message = canvas_comment_message.replace(/&gt;/gi, ">");
                        canvas_comment_message = canvas_comment_message.replace(/&amp;/gi, "&");
                        canvas_comment_message = canvas_comment_message.replace(/&quot;/gi, '"');
                        canvas_comment_message = canvas_comment_message.trim();
                        if (!canvas_comment_message) {
                            return
                        }
                        this.is_new = false;
                        this.hideForm()
                    }.bind(this));
                    element.appendTo($(document.getElementById('gigatester_screencapture_area')));
                        if(element.find("gtcomment").text()){
                            console.log(element.find("gtcomment").text())
                        element.find(".gigatester-btn-save").trigger('click');
                        }
                    element.find("gtcomment").val('').trigger('focus').val(canvas_comment_message);
                };
                this.getGigaData = function() {
                    let screen_x = parseInt(this.x - this.scroll_l - this.offset_x, 10);
                    let screen_y = parseInt(this.y - this.scroll_t - this.offset_y, 10);
                    return {
                        screen_x: screen_x,
                        screen_y: screen_y,
                        screen_number: this.counter + 1,
                        screenshot_num: this.screenshot_num,
                        message: canvas_comment_message
                    }
                };
                this.destroy = function() {
                    element.remove();
                    element = undefined;
                    canvas_comment_message = ""
                }
            };

             //this is the object that deals with creating the screen-recording/video attachment.
            let Screen_Recorder = {
                recorded_blobs: [],
                recorder: null,
                display_stream: null,
                audio_stream: null,
                combo_stream: null,
                options: {
                    onSubmit: null,
                    onCancel: null
                },
                timer_timeout: null,
                timer: 60,
                timer_total: 60,
                count_down_timeout: null,
                count_down: 0,
                is_muted: false,
                mime_type: 'video/webm; codecs="vp8, opus"',
                device_list: {
                    audioinput: [],
                    screeninput: [],
                },
                isOpen: function() {
                    return this.controls ? true : false
                },
                start: function(options) {
                    this.options.onSubmit = options.onSubmit || null;
                    this.options.onCancel = options.onCancel || null;
                    this.timer = options.timer || 180;
                    this.timer = Math.min(300, this.timer);
                    this.timer = Math.max(30, this.timer);
                    this.timer_total = this.timer;
                    this.reset();
                    this.getGigaDevice(this.createNewControls.bind(this));
                },
                reset: function() {
                    this.recorded_blobs = [];
                    this.recorder = null;
                    this.display_stream = null;
                    this.audio_stream = null;
                    this.combo_stream = null;
                    this.is_muted = false;
                    if (this.controls) {
                        this.pause_button.html(GigaTester_Icons.pause_icon)
                    }
                },
                getGigaDevice: async function (callback) {
                    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                        callback();
                        return
                    }
                    if (GigaTester_modal.configs.isSafari) {
                        console.log('browser is Safari')
                        this.startAltScreenRecorder();
                        callback();
                    } else {
                    await navigator.mediaDevices.enumerateDevices().then(function(devices) {
                        devices.forEach(function(device) {
                            // console.log(device)
                            switch (device.kind) {
                                case "audioinput":
                                    this.device_list.audioinput.push(device);
                                    break;
                                case "screeninput":
                                    this.device_list.screeninput.push(device);
                                    break;
                            }
                        }.bind(this));
                        if (this.device_list.audioinput.length || this.device_list.screeninput.length) {
                            this.startVideoCapture();
                            callback();
                        }
                    }.bind(this)).catch(function(error) {})

                    }
                },
                createNewControls: function() {
                    this.screen_recorder_overlay = $("<gtdiv>").attr("id", "gigatester_video_container").appendTo($(document.body));
                    this.controls = $("<gtvideotoolbar  id='gigatester-gtvideotoolbar' >").appendTo($(document.body));
                    this.mute_button = $("<btn>").addClass("gigatester-video-controls-mute gigatester-video-controls-active").html("<btn-tooltip>" + "<btn-name>" + GigaTester_StringRes.get("recording_mute", true) + "</btn-name>" + "</btn-tooltip>" + "<btn-tooltip-arrow></btn-tooltip-arrow>" + GigaTester_Icons.mic_icon).appendTo(this.controls);
                    this.pause_button = $("<btn>").addClass("gigatester-video-controls-pause").attr("disabled", true).html("<btn-tooltip>" + "<btn-name>" + GigaTester_StringRes.get("recording_pause", true) + "</btn-name>" +  "</btn-tooltip>" + "<btn-tooltip-arrow></btn-tooltip-arrow>" + GigaTester_Icons.pause_icon).appendTo(this.controls);
                    this.stop_button = $("<btn>").addClass("gigatester-video-controls-stop").html("<btn-tooltip>" + "<btn-name>" + GigaTester_StringRes.get("recording_finish", true) + "</btn-name>"  + "</btn-tooltip>" + GigaTester_Icons.stop_icon).appendTo(this.controls);
                    this.timer_anim_button = $("<btn>").addClass("gigatester-video-controls-stop").html("<btn-tooltip>" + "<btn-name>" + GigaTester_StringRes.get("remaining_time", true) + "</btn-name>"  + "</btn-tooltip>" + "<btn-tooltip-arrow></btn-tooltip-arrow>" + "<btn-timer><btn-timer-mask></btn-timer-mask></btn-timer>").appendTo(this.controls);
                    this.timer_button = $("<btn>").addClass("gigatester-video-controls-timer").text(this.getTimerStr()).appendTo(this.controls);
                    this.close_button = $("<btn>").addClass("gigatester-video-controls-close").html("<btn-tooltip>" + "<btn-name>" + GigaTester_StringRes.get("cancel", true) + "</btn-name>"  + "</btn-tooltip>" + "<btn-tooltip-arrow></btn-tooltip-arrow>" + GigaTester_Icons.close_icon).appendTo(this.controls);
                    // if (!this.device_list.audioinput.length) {
                    //     this.is_muted = true;
                    //     this.mute_button.removeClass("gigatester-video-controls-active").attr("disabled", true)
                    // }
                    this.timer_anim_button.find("btn-timer, btn-timer-mask").css("animation-duration", this.timer + "s");
                    this.stop_button.on("click", this.stopGTcapture.bind(this));
                    this.close_button.on("click", this.cancelGTcapture.bind(this));
                    this.pause_button.on("click", this.recordingPause.bind(this));
                    this.mute_button.on("click", this.voiceMute.bind(this));
                    // this.timer_anim_button.on("mouseenter", function(){
                    //    $(document.getElementsByClassName('gigatester-video-controls-timer')).addClass('gigatester-video-controls-timer-show')
                    //     console.log('on')
                    // });
                    // this.timer_anim_button.on("mouseleave", function(){
                    //     $(document.getElementsByClassName('gigatester-video-controls-timer')).removeClass('gigatester-video-controls-timer-show')
                    // });
                    dragElement(document.getElementById("gigatester-gtvideotoolbar"));
                    function dragElement(elmnt) {
                        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
                        if (document.getElementById(elmnt.id + "header")) {
                          /* if present, the header is where you move the DIV from:*/
                          document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
                        } else {
                          /* otherwise, move the DIV from anywhere inside the DIV:*/
                          elmnt.onmousedown = dragMouseDown;
                        }
                      
                        function dragMouseDown(e) {
                          e = e || window.event;
                          e.preventDefault();
                          // get the mouse cursor position at startup:
                          pos3 = e.clientX;
                          pos4 = e.clientY;
                          document.onmouseup = closeDragElement;
                          // call a function whenever the cursor moves:
                          document.onmousemove = elementDrag;
                        }
                      
                        function elementDrag(e) {
                          e = e || window.event;
                          e.preventDefault();
                          // calculate the new cursor position:
                          pos1 = pos3 - e.clientX;
                          pos2 = pos4 - e.clientY;
                          pos3 = e.clientX;
                          pos4 = e.clientY;
                          // set the element's new position:
                          elmnt.style.top = (elmnt.offsetTop - pos2) > 0 ? (elmnt.offsetTop - pos2) > ($(window).height()-50) ? ($(window).height()-60) + "px" :(elmnt.offsetTop - pos2) + "px" : 10 + "px";
                          elmnt.style.left = (elmnt.offsetLeft - pos1) >  0 ? (elmnt.offsetLeft - pos1) > ($(window).width()-300) ? ($(window).width()-310) + "px" : (elmnt.offsetLeft - pos1)  + "px" : 10 + "px";
                        }
                        
                        function closeDragElement() {
                            /* stop moving when mouse button is released:*/
                            document.onmouseup = null;
                            document.onmousemove = null;
                        }
                    }
                },
                removeGTControls: function () {
                    this.screen_recorder_overlay.remove();
                    this.controls.remove();
                    this.screen_recorder_overlay = null;
                    this.controls = null;
                    $("gtmouseclick").remove();
                },
                voiceMute: function() {
                    if (this.mute_button.attr("disabled")) {
                        return
                    }
                    this.is_muted = !this.is_muted;
                    if (this.is_muted) {
                        this.mute_button.removeClass("gigatester-video-controls-active");
                        this.mute_button.find("btn-name").text(GigaTester_StringRes.get("recording_unmute", true))
                    } else {
                        this.mute_button.addClass("gigatester-video-controls-active");
                        this.mute_button.find("btn-name").text(GigaTester_StringRes.get("recording_mute", true))
                    }
                    this.audioToggle()
                },
                audioToggle: function() {
                    if (!this.combo_stream) {
                        return
                    }
                    let audio_tracks = this.combo_stream.getAudioTracks();
                    if (audio_tracks.length) {
                        audio_tracks.forEach(function(audio_track) {
                            audio_track.enabled = !this.is_muted
                        }.bind(this))
                    }
                },
                startVideoCapture: function () {
                    let displayMediaOptions = {
                        video: {
                            cursor: "always"
                        },
                        audio: false,
                        preferCurrentTab: false
                    };
                    let userMediaOptions = {
                        audio: true,
                        video: false
                    };

                    try {
                        let afterGetVideoStream = function () {
                                this.display_stream.getTracks()[0].onended = function() {
                                    this.stopGTcapture()
                                }.bind(this);
                                GigaTester_modal.recording = true;
                                GigaTester_modal.video_recording_mode = true;
                                GigaTester_modal.set_screen_default_category = false;
                                let count_down = this.count_down;
                                let timer = function() {
                                    if (count_down === 0) {
                                        this.screen_recorder_overlay.hide();
                                        $(".gigatester-video-count-down").remove();
                                        this.startRecording()
                                    } else {
                                        $("<gttimer>").addClass("gigatester-video-count-down").text(count_down).appendTo($(document.body));
                                        count_down--;
                                        this.count_down_timeout = setTimeout(timer.bind(this), 1e3)
                                    }
                                };
                                timer.call(this);
                                this.timer_anim_button.show();
                                this.close_button.show()
                        }.bind(this);

                        let afterGetAudioStream = function() {
                            if (this.audio_stream) {
                                navigator.mediaDevices.getDisplayMedia(displayMediaOptions).then(function(stream) {
                                    this.display_stream = stream;
                                    let display_tracks = this.display_stream.getTracks();
                                    let audio_tracks = this.audio_stream.getTracks();
                                    this.combo_stream = new MediaStream(display_tracks.concat(audio_tracks));
                                    afterGetVideoStream()
                                }.bind(this)).catch((error) => {
                                    this.handleStreamCaptureError(error)
                                })
                            } else {
                                navigator.mediaDevices.getDisplayMedia(displayMediaOptions).then(function(stream) {
                                    this.display_stream = stream;
                                    let display_tracks = this.display_stream.getTracks();
                                    this.combo_stream = this.display_stream;
                                    this.is_muted = true;
                                    this.mute_button.removeClass("gigatester-video-controls-active").attr("disabled", true);
                                    afterGetVideoStream()
                                }.bind(this)).catch((error) => {
                                    this.handleStreamCaptureError(error)
                                })
                            }
                        }.bind(this);
                        console.log(this.device_list.audioinput.length);
                        if (this.device_list.audioinput.length >= 0) {
                            navigator.mediaDevices.getUserMedia(userMediaOptions).then(function(stream) {
                                this.audio_stream = stream;
                                afterGetAudioStream();
                            }.bind(this)).catch(function() {
                                afterGetAudioStream();
                            }.bind(this))
                        } else {
                            afterGetAudioStream()
                        }
                    } catch (e) {
                        this.handleStreamCaptureError(e)
                    }
                },
                startAltScreenRecorder: function () {
                    console.log('Alternative screen recorder')
                    let displayMediaOptions = {
                        video: {
                            cursor: "always"
                        },
                        audio: true,
                        preferCurrentTab: false
                    };
                    let userMediaOptions = {
                        audio: true,
                        video: false
                    };
                    try {
                        let afterGetVideoStream = function () {
                            let display_tracks = this.display_stream.getTracks();
                            let audio_tracks = this.audio_stream.getTracks();
                            this.combo_stream = new MediaStream(display_tracks.concat(audio_tracks));
                            this.display_stream.getTracks()[0].onended = function() {
                                this.stopGTcapture()
                            }.bind(this);
                            GigaTester_modal.recording = true;
                            GigaTester_modal.video_recording_mode = true;
                            GigaTester_modal.set_screen_default_category = false;
                            let count_down = this.count_down;
                            let timer = function () {
                                console.log('in timer function')
                                console.log('count', count_down)
                                if (count_down === 0) {
                                    this.screen_recorder_overlay.hide();
                                    $(".gigatester-video-count-down").remove();
                                    this.startRecording()
                                } else {
                                    $("<gttimer>").addClass("gigatester-video-count-down").text(count_down).appendTo($(document.body));
                                    count_down--;
                                    this.count_down_timeout = setTimeout(timer.bind(this), 1e3)
                                }
                            };
                            timer.call(this);
                            this.timer_anim_button.show();
                            this.close_button.show()
                        }.bind(this);

                        navigator.mediaDevices.getUserMedia(userMediaOptions).then(function(stream) {
                            this.audio_stream = stream;
                        }.bind(this)).catch(function() {
                            console.log('error')
                        }.bind(this))

                        navigator.mediaDevices.getDisplayMedia(displayMediaOptions).then(function (stream) {
                            console.log('stream', stream)
                            this.display_stream = stream;
                            let display_tracks = this.display_stream.getTracks();
                            this.combo_stream = this.display_stream;
                            this.is_muted = false;
                            // this.mute_button.removeClass("gigatester-video-controls-active").attr("disabled", true);
                            afterGetVideoStream()
                        }.bind(this)).catch((error) => {
                            this.handleStreamCaptureError(error)
                        })
                    } catch (error) {
                        console.log('error', error)
                    }

                },
                stopGTcapture: function () {
                    if (this.recorder) {
                        this.submitRecording()
                    } else {
                        this.recordingStop();
                        this.removeGTControls();
                        this.reset();
                        if (!GigaTester_modal.configs.isRemote) {
                            GigaTester_modal.custom_ui.button.show();
                        }
                        if (this.options.onCancel) {
                            this.options.onCancel()
                        }
                    }
                },
                cancelGTcapture: function() {
                    this.recordingStop();
                    this.removeGTControls();
                    this.reset();
                    if (!GigaTester_modal.configs.isRemote) {
                        GigaTester_modal.custom_ui.button.show();
                    }
                    if (this.options.onCancel) {
                        this.options.onCancel()
                    }
                },
                handleStreamCaptureError: function (e) {
                    console.log('handle stream error', e)
                    if (typeof e.name !== "undefined" && e.name === "NotAllowedError") {
                        console.log(e.name)
                        const errorMessage = e.toString();
                        errorMessage.replace('DOMException:')
                        GigaTester_modal.setNotifyStatus(`Screen Recorder Error - ${errorMessage}. Please grant browser access to record screen.`);
                        setTimeout(()=> {GigaTester_modal.clearNotifyStatus()}, 5000);
                        this.stopGTcapture()
                    } else {
                        console.log('Screen Recorder Error')
                        GigaTester_modal.setNotifyStatus("Screen Recorder Error, try again or use a different browser.");
                        setTimeout(() => { GigaTester_modal.clearNotifyStatus() }, 5000);
                        this.stopGTcapture()
                    }
                },
                getTimerStr: function() {
                    let min = Math.floor(this.timer / 60);
                    let sec = this.timer - min * 60;
                    if (min < 10) {
                        min = "0" + min
                    }
                    if (sec < 10) {
                        sec = "0" + sec
                    }
                    return min + ":" + sec
                },
                startTimer: function() {
                    this.timer_anim_button.find("btn-timer, btn-timer-mask").css("animation-play-state", "running");
                    this.timer_timeout = setInterval(function() {
                        let timer_text = this.getTimerStr();
                        this.timer_button.text(timer_text);
                        this.timer--;
                        if (timer_text === "00:00") {
                            clearInterval(this.timer_timeout);
                            this.submitRecording()
                        }
                    }.bind(this), 1e3)
                },
                stopTimer: function() {
                    clearInterval(this.timer_timeout)
                },
                countDownStop: function() {
                    clearTimeout(this.count_down_timeout)
                },
                startRecording: function () {
                    console.log('current mime type', this.mime_type)
                    try {
                        this.recorder = new MediaRecorder(this.combo_stream, {
                            mimeType: GigaTester_modal.configs.isSafari ? 'video/mp4' : this.mime_type
                        })
                    } catch (e) {
                        return
                    }
                    this.audioToggle();
                    this.recorder.addEventListener("dataavailable", this.dataHandler.bind(this));
                    this.recorder.start(10);
                    this.pause_button.removeAttr("disabled");
                    if (this.overlay) {
                        this.overlay.attr("recording", this.recorder ? "true" : "false")
                    }
                    this.startTimer();
                    window.addEventListener("beforeunload", function(e) {
                        if (!this.recorder) {
                            return
                        }
                        e.preventDefault();
                        e.returnValue = ""
                    }.bind(this))
                },
                recordingStop: function() {
                    if (this.recorder) {
                        this.recorder.stop()
                    }
                    if (this.combo_stream) {
                        this.combo_stream.getTracks().forEach(function(track) {
                            track.stop()
                        })
                    }
                    else if(this.audio_stream){
                        this.audio_stream.getTracks().forEach(function(track) {
                            track.stop()
                        })
                    }
                    console.log('stop recording')
                    this.stopTimer();
                    this.countDownStop()
                },
                recordingPause: function() {
                    if (this.pause_button.attr("disabled")) {
                        return
                    }
                    if (!this.recorder) {
                        return
                    }
                    switch (this.recorder.state) {
                        case "recording":
                            this.pause_button.html("<btn-tooltip><btn-name>" + GigaTester_StringRes.get("recording_resume", true) + "</btn-name></btn-tooltip><btn-tooltip-arrow></btn-tooltip-arrow>" + GigaTester_Icons.play_icon);
                            this.recorder.pause();
                            this.timer_anim_button.find("btn-timer, btn-timer-mask").css("animation-play-state", "paused");
                            this.stopTimer();
                            break;
                        case "paused":
                            this.pause_button.html("<btn-tooltip><btn-name>" + GigaTester_StringRes.get("recording_pause", true) + "</btn-name></btn-tooltip><btn-tooltip-arrow></btn-tooltip-arrow>" + GigaTester_Icons.pause_icon);
                            this.recorder.resume();
                            this.timer_anim_button.find("btn-timer, btn-timer-mask").css("animation-play-state", "running");
                            this.startTimer();
                            break
                    }
                },
                submitRecording: function() {
                    this.recordingStop();
                    if (this.options.onSubmit) {
                        let video_blob = new Blob(this.recorded_blobs, {
                            type: "video/mp4"
                        });
                        this.options.onSubmit(video_blob)
                    }
                    this.removeGTControls();
                    this.reset()
                },
                dataHandler: function(e) {
                    if (e.data && e.data.size > 0) {
                        this.recorded_blobs.push(e.data)
                    }
                }
            };

            //the main object that stores all the data and controls all the flow.
            let GigaTester_modal = {
                config_loaded: false,
                canvas_mode: false,
                video_recording_mode: false,
                controls_step: 0,
                multiSelect: false,
                form_type: "FEEDBACK",
                timer: 180,
                user_email: '', //store the email set by host app
                user_detail: {},
                context_detail: {},
                set_screen_default_category: true,
                save_form_state: false,
                confirmModal: false,
                configs: {
                    isRemote: false,
                    remoteBtns: [],
                    has_video: true,
                    isSafari: ( navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
                                navigator.userAgent &&
                                navigator.userAgent.indexOf('CriOS') == -1 &&
                                navigator.userAgent.indexOf('FxiOS') == -1), //false,
                    cuvoTypes: [],
                    categories:  ['Video', 'Screen', 'Audio', 'Images', 'Other'],
                    severities: [], //['Critical', 'High', 'Medium', 'Low'],
                    locale: 'en',
                    display_powered_by: true,
                    capture_system_details: true,
                    config_data: [],
                    selected_category: [],
                    rating_limit: 2,
                    title: "Cuvo",
                    main_button_icon: '',
                    main_button_text: "FEEDBACK",
                    main_button_text_color: "#FFFFFF",
                    main_button_background_color: "#042e5b",
                    main_button_font: "inherit",
                    main_button_fontWeight: 400,
                    main_button_rotation: '90',
                    main_button_position: 'RIGHT_MIDDLE',
                    main_button_left: '',
                    main_button_right: '',
                    main_button_top: '',
                    main_button_bottom: '',
                    main_button_borderRadius: '',
                    main_button_padding: '',
                    main_button_margin: '',
                    main_button_height: 40,
                    main_button_width: 140,
                    audio_time: 10,
                    feedback_default_category: "",
                    bugs_default_category:"",
                    screen_record_time: 120,
                    max_file_size: 20,
                    feedback_icon: GigaTester_Icons.feedback_icon,
                    bugs_icon: GigaTester_Icons.bug_icon,
                    feature_req_icon: GigaTester_Icons.feature_req_icon,
                    feedback_title: GigaTester_StringRes.get("give_feedback"),
                    bugs_title: GigaTester_StringRes.get("report_bug"),
                    feedback_tooltip_msg: GigaTester_StringRes.get("give_feedback_msg"),
                    bugs_tooltip_msg: GigaTester_StringRes.get("report_bug_msg"),
                    feature_tooltip_msg: GigaTester_StringRes.get("request_feature_msg"),
                    request_feature_title: GigaTester_StringRes.get("request_feature"),
                    request_feature_msg: GigaTester_StringRes.get("request_feature_msg"),
                },
                form_settings_default: {
                    BUGS: {
                        allow_screenshot: true,
                        allow_audio: true,
                        allow_video: true,
                        allow_attachment: true,
                        rating_type: "",
                        rating_title_message: "",
                        bug_title_message: GigaTester_StringRes.get("report_bug_msg"),
                        rating_mandatory: false,
                        email_field: true,
                        hide_email: true,
                        email_field_mandatory: true,
                        comment_field: true,
                        comment_field_mandatory: true,
                        comment_field_placeholder: "",
                        display_category: true,
                        display_severity: true,
                        category_field_mandatory: true,
                        severity_field_mandatory: true,
                        completed_dialog_icon: 0,
                        completed_dialog_headline: GigaTester_StringRes.get("thank_you_text"),
                        completed_dialog_paragraph: GigaTester_StringRes.get("thank_you_bug_msg")
                    },
                    FEEDBACK: {
                        allow_screenshot: true,
                        allow_audio: true,
                        allow_video: true,
                        allow_attachment: true,
                        rating_type: "STAR",
                        rating_title_message: GigaTester_StringRes.get("give_feedback_msg"),
                        rating_mandatory: true,
                        email_field: true,
                        hide_email: true,
                        email_field_mandatory: true,
                        comment_field: true,
                        comment_field_mandatory: true,
                        comment_field_placeholder: "",
                        display_category: true,
                        display_severity: false,
                        category_field_mandatory: true,
                        severity_field_mandatory: false,
                        completed_dialog_icon: 0,
                        completed_dialog_headline: GigaTester_StringRes.get("thank_you_text"),
                        completed_dialog_paragraph: GigaTester_StringRes.get("thank_you_feedback_msg")
                    },
                    FEATURE_REQ: {
                        allow_screenshot: true,
                        allow_audio: true,
                        allow_video: true,
                        allow_attachment: true,
                        reqFeature_title_msg: '',
                        email_field: true,
                        hide_email: true,
                        email_field_mandatory: true,
                        comment_field: true,
                        comment_field_mandatory: true,
                        comment_field_placeholder: "",
                        display_category: true,
                        display_severity: false,
                        category_field_mandatory: true,
                        severity_field_mandatory: false,
                        completed_dialog_icon: 0,
                        completed_dialog_headline: GigaTester_StringRes.get("thank_you_text"),
                        completed_dialog_paragraph: GigaTester_StringRes.get("thank_you_feedback_msg")
                    }
                },
                custom_ui: {
                    element: null,
                    button: null,
                    overlay: null,
                    events: null,
                    feedback_view: null
                },
                overlay_hint_tooltip_added: false,
                categories: "",
                video_blob: null,
                recording: false,
                form_data: {
                    rating: 0,
                    email: "",
                    description: "",
                    category: "",
                    severity: "",
                    audio_file: "",
                    video_file: "",
                    image_file:"",
                    external_file:"",
                },
                comments: [],
                init: function() {
                    this.configs.form_settings = this.form_settings_default;
                    this.loadApi()
                },
                loadApi: function() {
                    console.log('GigaTester: fetching configs')
                    window.GigaTester.isLoaded();
                    this.checkSessionStorage();
                },
                checkSelectDependancyload: function(){
                    if ( window.jQuery){
                        $('head').append('<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.full.js"></script>');
                    }
                 },
                addFeedbackButton: function() {
                    if (this.custom_ui.button) {
                        return
                    }
                    const root = $(document.getElementById('root'));
                    if(root){
                        root.attr({"data-html2canvas-ignore": "true"})
                    }
                    this.custom_ui.element = $("<gtdiv>").addClass("gigatester-ctrls-container").attr({
                        id: "gigatester_ctrls_container",
                    }).appendTo($(document.body));
                    this.custom_ui.button = $("<gtdiv>").addClass("gigatester-btn");
                    this.custom_ui.button.appendTo(this.custom_ui.element);
                    if (GigaTester_modal.configs.isRemote && GigaTester_modal.configs.isRemote === true) {
                        this.custom_ui.button[0].style.display = 'none';
                    } else {
                        if(this.configs.main_button_icon && this.configs.main_button_icon !== '') {
                            const iconAndText = `<span class="gigatester-btn-icon">${this.configs.main_button_icon}</span>${this.configs.main_button_text}`;
                            this.custom_ui.button.html(iconAndText);
                        } else {
                            this.custom_ui.button.text(this.configs.main_button_text);
                        }

                        this.custom_ui.button[0].style.fontFamily = this.configs.main_button_font;
                        this.custom_ui.button[0].style.fontWeight = this.configs.main_button_fontWeight;
                        this.custom_ui.button[0].style.color = this.configs.main_button_text_color;
                        this.custom_ui.button[0].style.webkitTextFillColor = this.configs.main_button_text_color;
                        this.custom_ui.button[0].style.backgroundColor = this.configs.main_button_background_color;
                        // this.custom_ui.button[0].style.display = 'none';
                        // const button = document.getElementById("gigatester_ctrls_container").getElementsByClassName("gigatester-btn")[0];
                        const styleCheck = window.getComputedStyle(this.custom_ui.button[0]);
                        const width = parseInt(styleCheck.width, 10);
                        const height = parseInt(styleCheck.height, 10);
                        // const top = parseInt(styleCheck.top, 10);
                        // const bottom = parseInt(styleCheck.bottom, 10);
                        // const left = parseInt(styleCheck.left, 10);
                        // const right = parseInt(styleCheck.right, 10);

                        const btnPosition = this.configs.main_button_position;
                        if (btnPosition === 'RIGHT_MIDDLE') {
                            this.custom_ui.button[0].style.right = `-${(width-height)/2}px`;
                            this.custom_ui.button[0].style.top = '50%';
                        } else if (btnPosition === 'RIGHT_BOTTOM') {
                            this.custom_ui.button[0].style.right = `-${(width-height)/2}px`;
                            this.custom_ui.button[0].style.bottom = `${(width)/2}px`;
                        } else if (btnPosition === 'LEFT_MIDDLE') {
                            this.custom_ui.button[0].style.top = '50%';
                            this.custom_ui.button[0].style.left = `-${(width-height)/2}px`;
                        } else if (btnPosition === 'LEFT_BOTTOM') {
                            this.custom_ui.button[0].style.left = `-${(width-height)/2}px`;;
                            this.custom_ui.button[0].style.bottom = `${(width)/2}px`;
                        } else if (btnPosition === 'BOTTOM_LEFT') {
                            this.custom_ui.button[0].style.top = '';
                            this.custom_ui.button[0].style.bottom = '0.5%';
                            this.custom_ui.button[0].style.left = '3%';
                        } else if (btnPosition === 'BOTTOM_RIGHT') {
                            this.custom_ui.button[0].style.top = '';
                            this.custom_ui.button[0].style.bottom = '0.5%';
                            this.custom_ui.button[0].style.right = '3%';
                        } else if (btnPosition === 'CUSTOM') {
                            this.custom_ui.button[0].style.top = this.configs.main_button_top;
                            this.custom_ui.button[0].style.bottom = this.configs.main_button_bottom;
                            this.custom_ui.button[0].style.left = this.configs.main_button_left;
                            this.custom_ui.button[0].style.right = this.configs.main_button_right;
                            this.custom_ui.button[0].style.borderRadius = this.configs.main_button_borderRadius;
                            this.custom_ui.button[0].style.margin = this.configs.main_button_margin;
                            this.custom_ui.button[0].style.padding = this.configs.main_button_padding;
                        }
                    }
                    this.custom_ui.button[0].style.transform = `rotate(${this.configs.main_button_rotation}deg)`;

                    this.custom_ui.button.on("click", this.popOutDialog.bind(this));
                    this.custom_ui.button.on("click mouseup mousedown", function(e) {
                        e.stopPropagation()
                    });
                    this.custom_ui.element.on("keydown keyup", (e) => {
                        e.stopPropagation()
                    });
                },
                setNotifyStatus: function(message) {
                    if (!this.custom_ui.screen_status) {
                        this.custom_ui.screen_status = $("<gtdiv>").addClass("gigatester-screen-status").attr("data-html2canvas-ignore", "true");
                        this.custom_ui.screen_status.appendTo($(document.body));
                    }
                    this.custom_ui.screen_status.text(message);
                },
                clearNotifyStatus: function() {
                    if (this.custom_ui.screen_status) {
                        this.custom_ui.screen_status.remove();
                        this.custom_ui.screen_status = false
                    }
                },
                autoHide: function() {
                    if (this.canvas_mode) {
                        return true
                    }
                    return false
                },
                getFormSettings: function(form_type) {
                    return this.form_settings_default[form_type]
                },
                checkSessionStorage: function(){
                    console.log("GigaTester: checkSessionStorage called");
                    if(sessionStorage){
                    for(let i=0; i<sessionStorage.length;i++){
                        const key = sessionStorage.key(i);
                        // console.log(` GigaTester: ${key} => ${sessionStorage.getItem(key)}`)
                        if(key === 'gigatesterDefaultFeedbackCategory'){
                            GigaTester_modal.configs.feedback_default_category = sessionStorage.getItem(key).trim()
                        }
                        if(key === 'gigatesterDefaultBugsCategory'){
                            GigaTester_modal.configs.bugs_default_category = sessionStorage.getItem(key).trim()
                        }
                        if(key === 'gigatesterDefaultUserDetails'){
                            let userDetails = JSON.parse(sessionStorage.getItem(key))
                            Object.entries(userDetails).forEach(([key, val]) => {
                                if(key.trim().toLowerCase() == "email"){
                                    GigaTester.setEmail(val)
                                }
                                // console.log('GigaTester : userDetails ', key, val);
                              });
                        }
                    }
                }
                },
                addCanvas: function() {
                    if (this.custom_ui.overlay) {
                        return
                    }
                    this.custom_ui.element.attr("drawing", "true");
                    this.hideControls();
                    this.custom_ui.overlay = $("<gtdiv>").addClass("gigatester-overlay")
                    this.custom_ui.overlay.appendTo($(document.getElementById('gigatester_screencapture_area')));
                    this.custom_ui.overlay.append('<svg id="snap_svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"></svg>');
                    this.Draw_Tools.init();
                    this.custom_ui.overlay.on("click mouseup mousedown mouseout mousemove mouseenter mouseleave touchstart touchmove touchcancel touchend", $.proxy(function(e) {
                        if (this.Draw_Tools.dragging_obj || this.Draw_Tools.draw_started) {
                            return
                        }
                        e.stopPropagation()
                    }, this));
                    this.overlay_hint_tooltip_added = false;
                    let setTooltipPos = function(e) {
                        if (!this.custom_ui.overlay_hint_tooltip) {
                            return
                        }
                        if (this.canvas_mode) {
                            this.custom_ui.overlay_hint_tooltip.css({
                                top: e.offsetY,
                                left: e.offsetX - 10
                            })
                        } else {
                            this.custom_ui.overlay_hint_tooltip.css({
                                top: e.clientY,
                                left: e.clientX - 10
                            })
                        }
                    }.bind(this);
                    this.custom_ui.overlay.on("mouseenter", function(e) {
                        if (!this.custom_ui.overlay_hint_tooltip && !this.overlay_hint_tooltip_added) {
                            // console.log('GigaTester: overlay hint');
                            this.custom_ui.overlay_hint_tooltip = $("<div>").addClass("gigatester-overlay-hint-cursor").text(GigaTester_StringRes.get("draw_hint"));
                            setTooltipPos(e);
                            this.custom_ui.overlay_hint_tooltip.appendTo(this.custom_ui.overlay)
                        }
                    }.bind(this));
                    this.custom_ui.overlay.on("mousemove", function(e) {
                        setTooltipPos(e)
                    }.bind(this));
                    this.custom_ui.overlay.on("mouseleave", function() {
                        if (this.custom_ui.overlay_hint_tooltip) {
                            this.custom_ui.overlay_hint_tooltip.remove()
                        }
                        this.custom_ui.overlay_hint_tooltip = false
                    }.bind(this));
                    $(window).on("resize", $.proxy(this.resizeWindow, this))
                },
                setGToverlaySize: function() {
                    if (!this.canvas_mode) {
                        return
                    }
                    if (!this.custom_ui.overlay) {
                        return
                    }
                    let captureArea = $("gtdiv#gigatester_screencapture_area");
                    this.custom_ui.overlay.css({
                        top: captureArea.offset().top,
                        left: captureArea.offset().left,
                    })
                },
                removeGToverlay: function() {
                    if (!this.custom_ui.overlay) {
                        return
                    }
                    $(document.getElementById('gigatester_screencapture_area')).remove()
                    this.custom_ui.element.removeAttr("drawing");
                    if (this.custom_ui.overlay.overlay_hint_tooltip) {
                        this.custom_ui.overlay.overlay_hint_tooltip.remove();
                        this.custom_ui.overlay.overlay_hint_tooltip = null
                    }
                    this.custom_ui.overlay = null;
                    this.canvas_mode = false;
                    $(document.getElementById('gigatester_screencapture_dialog')).remove()
                    $(window).off("resize", $.proxy(this.resizeWindow, this))
                },
                Draw_Tools: {
                    start_x: 0,
                    start_y: 0,
                    stop_x: 0,
                    stop_y: 0,
                    path_min_x: 0,
                    path_min_y: 0,
                    path_max_x: 0,
                    path_max_y: 0,
                    svg_delete_icons: [],
                    annotation_count: 0,
                    svg_user_draw: [],
                    type: "square",
                    color: {
                        options: ["#cc0000", "#ff7700", "#ffdd00", "#66ee00", "#00aa00",
                         "#00dddd", "#0077ff", "#0000aa", "#ff00dd", "#777777", "#000000"],
                        value:  "#ff7700"
                    },
                    svg_obj_initial: false,
                    svg_obj_arrow_group: false,
                    svg_obj_new_arrow: false,
                    svg_obj_new_arrow_top: false,
                    svg_obj_line: false,
                    svg_obj_rectangular: false,
                    svg_obj_path: false,
                    draw_started: false,
                    dragging_obj: false,
                    image_capture: false,
                    toolbar: null,
                    min_drag_distance: 10,
                    toolbar_is_hidden: false,
                    init: function() {
                        this.snap = Snap("#snap_svg");
                        this.svg_obj_initial = this.snap.path();
                        this.svg_obj_initial.attr({
                            "fill-opacity": GigaTester_modal.canvas_mode ? 0 : .01,
                            "fill-rule": "evenodd"
                        });
                        this.setBaseSize();
                        this.snap.drag(this.onDragMove.bind(this), this.isDragStart.bind(this), this.onDragStop.bind(this));
                        this.snap.touchstart(this.isDragStart.bind(this));
                        this.snap.touchmove(this.onDragMove.bind(this));
                        this.snap.touchcancel(this.onDragStop.bind(this));
                        this.snap.touchend(this.onDragStop.bind(this));
                        this.addTools()
                    },
                    setBaseSize: function() {
                        if (!this.svg_obj_initial) {
                            return
                        }
                        let base_width = $("#snap_svg").width();
                        let base_height = $("#snap_svg").height();
                        let path = "M0 0 h" + base_width + " v" + base_height + " h-" + base_width + " Z";
                        for (let i = 0; i < this.svg_user_draw.length; i++) {
                            path += " M" + this.svg_user_draw[i].x + " " + this.svg_user_draw[i].y + " h" + this.svg_user_draw[i].w + " v" + this.svg_user_draw[i].h + " h-" + this.svg_user_draw[i].w + " Z"
                        }
                        this.svg_obj_initial.attr("path", path)
                    },
                    addTools: function() {
                        if (GigaTester_modal.is_touch) {
                            GigaTester_modal.scrollDisable()
                        }
                        if (this.toolbar) {
                            return
                        }
                        let tool_color_indicator = "";
                        tool_color_indicator += '<gtdiv class="gigatester-toolbar-tool-color-indicator">';
                        tool_color_indicator += "<gtcolorpicker>";
                        $.each(this.color.options, function(index, color) {
                            tool_color_indicator += '<gtdiv class="gigatester-toolbar-tool-color-indicator-option" data-color="' + color + '">' + '<span style="background-color:' + color + ';"' + (color === "#FFFFFF" ? ' hasborder="1"' : "") + "></span>" + "</gtdiv>"
                        });
                        tool_color_indicator += "</gtcolorpicker>";
                        tool_color_indicator += "</gtdiv>";
                        let tools = '<btn class="gigatester-toolbar-tool gigatester-toolbar-tool-square" data-type="square"">' + GigaTester_Icons.square_outline_icon +"<btn-tooltip>" + "<btn-name>" + GigaTester_StringRes.get("rectangle") + "</btn-name>" + "</btn-tooltip>" + "</btn>"
                         + '<btn class="gigatester-toolbar-tool gigatester-toolbar-tool-blackout" data-type="blackout" ">' + GigaTester_Icons.square_filled_icon + "<btn-tooltip>" + "<btn-name>" + GigaTester_StringRes.get("blackout") + "</btn-name>" + "</btn-tooltip>" +"</btn>"
                         + '<btn class="gigatester-toolbar-tool gigatester-toolbar-tool-color" data-type="color">' + tool_color_indicator + "<btn-tooltip>" + "<btn-name>" + GigaTester_StringRes.get("color_palette") + "</btn-name>" + "</btn-tooltip>" + "</btn>"
                         + '<btn class="gigatester-toolbar-tool-done gigatester-toolbar-tool-done-active">' + GigaTester_StringRes.get("capture") + "<btn-tooltip>" + "<btn-name>" + GigaTester_StringRes.get("capture_screenshot") + "</btn-name>" + "</btn-tooltip>" + "</btn>"
                         + '<btn class="gigatester-toolbar-close">' +  GigaTester_Icons.close_icon + "<btn-tooltip>" + "<btn-name>" + GigaTester_StringRes.get("discard_screenshot") + "</btn-name>" + "</btn-tooltip>" + "</btn>";
                        this.toolbar = $("<gttoolbar>").attr("lang", GigaTester_modal.configs.locale).attr("data-html2canvas-ignore", "true");
                        this.toolbar.html(tools);
                        this.setToolsColor();
                        this.toolbar.insertBefore($('gtdiv#gigatester_screencapture_area'));
                        this.toolbar.on("mouseenter", $.proxy(function() {
                            if (this.draw_started || this.dragging_obj) {
                                this.toolbar.css("opacity", "0.2")
                            }
                        }, this));
                        this.toolbar.on("mouseleave", $.proxy(function() {
                            this.toolbar.css("opacity", "")
                        }, this));
                        this.toolbar.find('.gigatester-toolbar-tool[data-type="' + this.type + '"]').addClass("gigatester-toolbar-tool-active");
                        this.toolbar.find(".gigatester-toolbar-tool").on("click", $.proxy(function(e) {
                            let tool_type = $(e.currentTarget).data("type");
                            if (tool_type === "color") {
                                return
                            }
                            this.type = tool_type;
                            this.toolbar.find(".gigatester-toolbar-tool").removeClass("gigatester-toolbar-tool-active");
                            $(e.currentTarget).addClass("gigatester-toolbar-tool-active");
                            GigaTester_modal.custom_ui.overlay.attr("tooltype", this.type)
                        }, this));
                        this.toolbar.find(".gigatester-toolbar-tool-done").on("click", function(e) {
                            e.stopPropagation();
                            e.preventDefault();
                            GigaTester_modal.hideCommentForm();
                            GigaTester_modal.finalScreenshot();
                        }.bind(this));
                        this.toolbar.find(".gigatester-toolbar-close").on("click", function(e) {
                            e.stopPropagation();
                            e.preventDefault();
                            this.cancelGTcapture();
                            GigaTester_modal.removeComments();
                            if (!GigaTester_modal.configs.isRemote) {
                                GigaTester_modal.custom_ui.button.show();
                            }
                            GigaTester_modal.Draw_Tools.image_capture = false;
                        }.bind(this));
                        this.toolbar.find(".gigatester-toolbar-tool-color-indicator-option").on("click", $.proxy(function(e) {
                            let color = $(e.currentTarget).data("color");
                            this.color.value = color;
                            this.setToolsColor()
                        }, this));
                        this.toolbar.on("click", function(e) {
                            e.stopPropagation()
                        })
                    },
                    cancelGTcapture: function() {
                            GigaTester_modal.form_data.rating = GigaTester_modal.form_data.rating;
                            GigaTester_modal.form_data.comment_field =  GigaTester_modal.form_data.comment_field;
                            GigaTester_modal.form_data.category = GigaTester_modal.form_data.category;
                            GigaTester_modal.set_screen_default_category = false;
                            GigaTester_modal.saveCheckedCategory();
                            GigaTester_modal.setDialogForm();
                            console.log('GigaTester : cancel annotation')
                            GigaTester_modal.showControls();
                            if(GigaTester_modal.form_data.rating){
                                GigaTester_modal.selectedRating();
                            }
                            GigaTester_modal.saveSubCategory();
                            GigaTester_modal.removeGToverlay();
                            this.removeTools()
                    },
                    removeTools: function() {
                        GigaTester_modal.scrollEnable();
                        if (!this.toolbar) {
                            return
                        }
                        this.toolbar.remove();
                        this.toolbar = null;
                        this.svg_obj_initial = null;
                        this.svg_user_draw = []
                    },
                    removeTrashIcons: function() {
                        $(this.svg_delete_icons).each(function() {
                            this.remove()
                        });
                        this.svg_delete_icons = []
                    },
                    setToolsColor: function() {
                        this.toolbar.find(".gigatester-toolbar-tool-color-indicator").css("background-color", this.color.value);
                        if (this.color.value === "#FFFFFF") {
                            this.toolbar.find(".gigatester-toolbar-tool-color-indicator").attr("hasborder", 1)
                        } else {
                            this.toolbar.find(".gigatester-toolbar-tool-color-indicator").removeAttr("hasborder")
                        }
                    },
                    isDragStart: function() {
                        let x, y, event;
                        if (typeof arguments[0] === "object") {
                            event = arguments[0]
                        } else {
                            event = arguments[2]
                        }
                            x = event.clientX -10;
                            y = event.clientY -10;
                        if (GigaTester_modal.canvas_mode) {
                            x = event.offsetX;
                            y = event.offsetY
                        }
                        x = parseInt(x, 10);
                        y = parseInt(y, 10);
                        if (this.dragging_obj) {
                            if (this.dragging_obj.data("drag_started")) {
                                return
                            }
                            this.dragging_obj.appendTo(self.snap);
                            this.dragging_obj.data("drag_started", true);
                            this.dragging_obj.data("original_x", x);
                            this.dragging_obj.data("original_y", y);
                            if (!this.dragging_obj.data("transform_x")) {
                                this.dragging_obj.data("transform_x", 0);
                                this.dragging_obj.data("transform_y", 0)
                            }
                            if (this.dragging_obj.data("type") === "square") {
                                let cut_out_x = this.dragging_obj[0].attr("x");
                                let cut_out_y = this.dragging_obj[0].attr("y");
                                let user_draw_count = false;
                                for (let i = 0; i < this.svg_user_draw.length; i++) {
                                    if (this.svg_user_draw[i].x == cut_out_x && this.svg_user_draw[i].y == cut_out_y) {
                                        user_draw_count = i;
                                        break
                                    }
                                }
                                if (user_draw_count !== false) {
                                    this.dragging_obj.data("user_draw_count", user_draw_count);
                                    this.dragging_obj.data("cut_out_original_x", this.svg_user_draw[user_draw_count].x);
                                    this.dragging_obj.data("cut_out_original_y", this.svg_user_draw[user_draw_count].y)
                                }
                            }
                        } else {
                            if (this.draw_started) {
                                console.log(this.image_capture, 'img capture')
                                return
                            }
                            this.draw_started = true;
                            let cut_out_id = (new Date).getTime();
                            switch (this.type) {
                                case "square":
                                    this.svg_obj_rectangular = this.snap.rect(x, y, 1, 1, 3, 3);
                                    this.svg_obj_rectangular.attr({
                                        stroke: this.color.value,
                                        "stroke-width": 3,
                                        "stroke-linecap": "square",
                                        "stroke-linejoin": "square",
                                        fill: "transparent",
                                        opacity: .6
                                    });
                                    this.svg_user_draw.push({
                                        id: cut_out_id,
                                        x: x,
                                        y: y,
                                        w: 0,
                                        h: 0
                                    });
                                    break;
                                case "blackout":
                                    this.svg_obj_rectangular = this.snap.rect(x, y, 1, 1, 3, 3);
                                    this.svg_obj_rectangular.attr({
                                        fill: this.color.value,
                                        class: "blackout",
                                        opacity: .5
                                    });
                                    break;
                            }
                        }
                        this.start_x = x;
                        this.start_y = y;
                        this.stop_x = x;
                        this.stop_y = y;
                        this.path_min_x = x;
                        this.path_min_y = y;
                        this.path_max_x = x;
                        this.path_max_y = y;
                        this.toolbar_left = this.toolbar.offset().left - 30;
                        this.toolbar_right = this.toolbar_left + this.toolbar.outerWidth() + 60;
                        this.toolbar_top = this.toolbar.position().top - 30;
                        this.toolbar_bottom = this.toolbar_top + this.toolbar.outerHeight() + 60
                    },
                    onDragStop: function(event) {
                        let x, y;
                            x = event.clientX;
                            y = event.clientY
                        if (GigaTester_modal.canvas_mode) {
                            x = event.pageX - GigaTester_modal.custom_ui.overlay.offset().left;
                            y = event.pageY - GigaTester_modal.custom_ui.overlay.offset().top
                        }
                        if (this.dragging_obj) {
                            if (!this.dragging_obj.data("drag_started")) {
                                return
                            }
                            this.dragging_obj.data("drag_started", false);
                            let movement_x = Math.abs(this.start_x - x);
                            let movement_y = Math.abs(this.start_y - y);
                            if (!$(event.target).hasClass("gigatester-svg-delete") && movement_x <= 2 && movement_y <= 2) {
                                GigaTester_modal.canvasCommentStart.call(GigaTester_modal, event)
                                console.log('svg delete comment')
                            }
                            this.dragging_obj = false;
                            this.start_x = 0;
                            this.start_y = 0;
                            this.stop_x = 0;
                            this.stop_y = 0;
                            this.path_min_x = 0;
                            this.path_min_y = 0;
                            this.path_max_x = 0;
                            this.path_max_y = 0
                        } else {
                            if (!this.draw_started) {
                                return
                            }
                            this.toolbar.removeClass("gigatester-toolbar-slide-out");
                            if (this.type === "text" || Math.abs(this.path_max_x - this.path_min_x) < this.min_drag_distance && Math.abs(this.path_max_y - this.path_min_y) < this.min_drag_distance) {
                                switch (this.type) {
                                    case "square":
                                    case "blackout":
                                        this.svg_obj_rectangular.remove();
                                        break;
                                }
                                if (this.svg_user_draw.length) {
                                    let last_cut_out = this.svg_user_draw[this.svg_user_draw.length - 1];
                                    if (last_cut_out.w < this.min_drag_distance && last_cut_out.h < this.min_drag_distance) {
                                        this.svg_user_draw.splice(this.svg_user_draw.length - 1, 1)
                                    }
                                }
                                this.setBaseSize();
                                console.log('comment at click')
                                GigaTester_modal.canvasCommentStart.call(GigaTester_modal, event);
                                GigaTester_modal.custom_ui.overlay.trigger("mouseleave")
                            } else {
                                let icon_x = x - 12;
                                let icon_y = y - 12;
                                if (this.type === "square" || this.type === "blackout") {
                                    icon_x = parseInt(this.svg_obj_rectangular.attr("x"), 10) + parseInt(this.svg_obj_rectangular.attr("width"), 10) - 12;
                                    icon_y = parseInt(this.svg_obj_rectangular.attr("y"), 10) - 12
                                }
                                let icon = this.snap.image(GigaTester_Icons.delete_image, icon_x, icon_y, 24, 24).attr({
                                    cursor: "pointer",
                                }).addClass("gigatester-svg-delete");
                                this.svg_delete_icons.push(icon);
                                console.log('comment_counter at drag');
                                GigaTester_modal.canvasCommentStart.call(GigaTester_modal, event);
                                switch (this.type) {
                                    case "square":
                                        this.svg_obj_rectangular.attr({
                                            opacity: 1
                                        });
                                        this.svg_obj_rectangular = this.snap.group(this.svg_obj_rectangular, icon);
                                        this.isHoverable(this.svg_obj_rectangular, icon, this.type, this.svg_user_draw[this.svg_user_draw.length - 1].id);
                                        this.isDraggable(this.svg_obj_rectangular, this.type);
                                        break;
                                    case "blackout":
                                        this.svg_obj_rectangular.attr({
                                            opacity: 1
                                        });
                                        this.svg_obj_rectangular = this.snap.group(this.svg_obj_rectangular, icon);
                                        this.isHoverable(this.svg_obj_rectangular, icon, this.type);
                                        this.isDraggable(this.svg_obj_rectangular, this.type);
                                        break;
                                }
                            }
                            this.draw_started = false;
                            this.start_x = 0;
                            this.start_y = 0;
                            this.stop_x = 0;
                            this.stop_y = 0;
                            this.svg_obj_arrow_group = false;
                            this.svg_obj_new_arrow_top = false;
                            this.svg_obj_new_arrow = false;
                            this.svg_obj_line = false;
                            this.svg_obj_rectangular = false;
                            this.svg_obj_path = false;
                            this.toolbar.find(".gigatester-toolbar-tool-done").addClass("gigatester-toolbar-tool-done-active")
                        }
                        GigaTester_modal.overlay_hint_tooltip_added = true;
                        if (GigaTester_modal.custom_ui.overlay_hint_tooltip) {
                            GigaTester_modal.custom_ui.overlay_hint_tooltip.remove();
                            GigaTester_modal.custom_ui.overlay_hint_tooltip = false
                        }
                        console.log('GigaTester: drag stopped')
                        $(document.getElementsByClassName('.gigatester-btn-save')).trigger('click')
                        GigaTester_modal.scrollDisable()
                    },
                    onDragMove: function() {
                        let x, y, event;
                        if (typeof arguments[0] === "object") {
                            event = arguments[0]
                        } else {
                            event = arguments[4]
                        }
                            x = event.clientX;
                            y = event.clientY
                        if (GigaTester_modal.canvas_mode) {
                            x = event.pageX - GigaTester_modal.custom_ui.overlay.offset().left;
                            y = event.pageY - GigaTester_modal.custom_ui.overlay.offset().top
                        }
                        if (this.dragging_obj) {
                            if (!this.dragging_obj.data("drag_started")) {
                                return
                            }
                            let hovered = new Snap.Matrix;
                            let mouse_movement_x = x - this.dragging_obj.data("original_x");
                            let mouse_movement_y = y - this.dragging_obj.data("original_y");
                            let transform_x = mouse_movement_x + this.dragging_obj.data("transform_x");
                            let transform_y = mouse_movement_y + this.dragging_obj.data("transform_y");
                            this.dragging_obj.data("transform_x_temp", transform_x);
                            this.dragging_obj.data("transform_y_temp", transform_y);
                            hovered.translate(transform_x, transform_y);
                            this.dragging_obj.transform(hovered);
                            if (this.dragging_obj.data("type") === "square") {
                                let user_draw_count = this.dragging_obj.data("user_draw_count");
                                this.svg_user_draw[user_draw_count].x = this.dragging_obj.data("cut_out_original_x") + transform_x;
                                this.svg_user_draw[user_draw_count].y = this.dragging_obj.data("cut_out_original_y") + transform_y;
                                this.setBaseSize()
                            }
                        } else {
                            if (!this.draw_started) {
                                return
                            }
                            let direction_x = x - this.start_x > 0 ? "right" : "left";
                            let direction_y = y - this.start_y > 0 ? "down" : "up";
                            this.stop_x = x;
                            this.stop_y = y;
                            this.stop_x = Math.max(6, this.stop_x);
                            this.stop_y = Math.max(6, this.stop_y);
                            this.stop_x = Math.min(this.snap.node.clientWidth - 6, this.stop_x);
                            this.stop_y = Math.min(this.snap.node.clientHeight - 6, this.stop_y);
                            this.path_min_x = Math.min(this.path_min_x, x);
                            this.path_min_y = Math.min(this.path_min_y, y);
                            this.path_max_x = Math.max(this.path_max_x, x);
                            this.path_max_y = Math.max(this.path_max_y, y);
                            switch (this.type) {
                                case "square":
                                    let square_x = direction_x === "right" ? this.start_x : this.stop_x;
                                    let square_y = direction_y === "down" ? this.start_y : this.stop_y;
                                    let square_w = Math.abs(this.stop_x - this.start_x);
                                    let square_h = Math.abs(this.stop_y - this.start_y);
                                    this.svg_obj_rectangular.attr({
                                        x: square_x,
                                        y: square_y,
                                        width: square_w,
                                        height: square_h
                                    });
                                    this.svg_user_draw[this.svg_user_draw.length - 1].x = square_x;
                                    this.svg_user_draw[this.svg_user_draw.length - 1].y = square_y;
                                    this.svg_user_draw[this.svg_user_draw.length - 1].w = square_w;
                                    this.svg_user_draw[this.svg_user_draw.length - 1].h = square_h;
                                    this.setBaseSize();
                                    break;
                                case "blackout":
                                    this.svg_obj_rectangular.attr({
                                        x: direction_x === "right" ? this.start_x : this.stop_x,
                                        y: direction_y === "down" ? this.start_y : this.stop_y,
                                        width: Math.abs(this.stop_x - this.start_x),
                                        height: Math.abs(this.stop_y - this.start_y)
                                    });
                                    break;
                            }
                            if (Math.abs(this.stop_x - this.start_x) > this.min_drag_distance || Math.abs(this.stop_y - this.start_y) > this.min_drag_distance) {
                                if (this.stop_x > this.toolbar_left && this.stop_x < this.toolbar_right && this.stop_y > this.toolbar_top && this.stop_y < this.toolbar_bottom) {
                                    this.toolbar.addClass("gigatester-toolbar-slide-out");
                                    this.toolbar_is_hidden = true
                                } else if (this.toolbar_is_hidden) {
                                    this.toolbar.removeClass("gigatester-toolbar-slide-out");
                                    this.toolbar_is_hidden = false
                                }
                            }
                        }
                    },
                    isHoverable: function(obj, delete_icon, type, cut_out_id) {
                        let timeout_id = false;
                        let self = this;
                        this.annotation_count++;
                        let _doRemove = function() {
                            obj.remove();
                            if (type === "square") {
                                let user_draw_count = false;
                                for (let i = 0; i < self.svg_user_draw.length; i++) {
                                    if (self.svg_user_draw[i].id === cut_out_id) {
                                        user_draw_count = i;
                                        break
                                    }
                                }
                                if (user_draw_count !== false) {
                                    self.svg_user_draw.splice(user_draw_count, 1);
                                    self.setBaseSize()
                                }
                            }
                        };
                        delete_icon.click(function(e) {
                            _doRemove();
                            this.annotation_count--;
                            if (this.annotation_count === 0) {
                                GigaTester_modal.scrollEnable()
                            }
                        }.bind(this));
                        obj.mouseover(function() {
                            GigaTester_modal.custom_ui.overlay.attr("hidecursor", "true");
                            if (self.draw_started) {
                                return
                            }
                            clearTimeout(timeout_id);
                            delete_icon.attr("display", "");
                        });
                        obj.mouseout(function() {
                            GigaTester_modal.custom_ui.overlay.removeAttr("hidecursor");
                            timeout_id = setTimeout(function() {
                                delete_icon.attr("display", "none");
                            }.bind(this), 200)
                        });
                    },
                    isDraggable: function(obj, type) {
                        let isDragStart = $.proxy(function(event, x, y) {
                            this.dragging_obj = obj;
                            this.dragging_obj.data("type", type)
                        }, this);
                        obj.attr({
                            cursor: "move"
                        });
                        obj.mousedown($.proxy(isDragStart, this));
                        obj.touchstart($.proxy(isDragStart, this))
                    }
                },
                resizeWindow: function(e) {
                    if (this.custom_ui.overlay) {
                        this.setGToverlaySize();
                        this.Draw_Tools.setBaseSize.call(this.Draw_Tools)
                    }
                },
                _mouseScroll: function(e) {
                    if ($(e.target).hasClass("gtmousescroll")) {} else {
                        e.preventDefault()
                    }
                },
                _scrollKeyDown: function(e) {
                    if ($(e.target).hasClass("gtmousescroll")) {
                        return
                    }
                    if ($(e.target).prop("tagName") === "TEXTAREA") {
                        return
                    }
                    let keys = {
                        37: 1,
                        38: 1,
                        39: 1,
                        40: 1
                    };
                    if (keys[e.keyCode]) {
                        e.preventDefault()
                    }
                },
                _scrollWindow: function(e) {
                    $(window).scrollTop(this._scroll_top)
                },
                scrollDisable: function() {
                    if (this.canvas_mode) {
                        return
                    }
                    if (this._scroll_disabled) {
                        return
                    }
                    this._scroll_top = $(window).scrollTop();
                    this._scroll_disabled = true;
                    $("html").addClass("gt-noscroll");
                    $(window).on("scroll", $.proxy(this._scrollWindow, this));
                    window.addEventListener("DOMMouseScroll", this._mouseScroll, {
                        passive: false
                    });
                    window.addEventListener("touchmove", this._mouseScroll, {
                        passive: false
                    });
                    window.addEventListener("wheel", this._mouseScroll, {
                        passive: false
                    });
                    window.addEventListener("mousewheel", this._mouseScroll, {
                        passive: false
                    });
                    $(document).on("keydown", this._scrollKeyDown)
                },
                scrollEnable: function() {
                    this._scroll_disabled = false;
                    $("html").removeClass("gt-noscroll");
                    $(window).off("scroll", $.proxy(this._scrollWindow, this));
                    window.removeEventListener("DOMMouseScroll", this._mouseScroll, {
                        passive: false
                    });
                    window.removeEventListener("touchmove", this._mouseScroll, {
                        passive: false
                    });
                    window.removeEventListener("wheel", this._mouseScroll, {
                        passive: false
                    });
                    window.removeEventListener("mousewheel", this._mouseScroll, {
                        passive: false
                    });
                    $(document).off("keydown", this._scrollKeyDown)
                },
                addCanvasComment: function(x, y) {
                    this.closeEmptyCanvasComment();
                    let screenshot_num = 0;
                    let counter = 0;
                    $.each(this.comments, function(index, comment) {
                        if (comment.screenshot_num === screenshot_num) {
                            counter++
                        }
                    });
                    let comment = new GigaTester_ScreenshotComment({
                        x: x,
                        y: y,
                        scroll_l: this.canvas_mode ? 0 : $(window).scrollLeft(),
                        scroll_t: this.canvas_mode ? 0 : $(window).scrollTop(),
                        offset_x: this.canvas_mode ? this.custom_ui.overlay.offset().left : 0,
                        offset_y: this.canvas_mode ? this.custom_ui.overlay.offset().top : 0,
                        is_mobile: this.is_mobile,
                        screenshot_num: screenshot_num,
                        counter: counter,
                        onOpen: $.proxy(function(counter) {
                            $.each(this.comments, function(comment) {
                                if (comment.screenshot_num === screenshot_num && comment.counter !== counter) {
                                    comment.hideForm()
                                    console.log('GigaTester: comment form open')
                                }
                            })
                        }, this),
                        onDelete: $.proxy(function(counter) {
                            let index_lookup = false;
                            $.each(this.comments, function(index, comment) {
                                if (comment.screenshot_num === screenshot_num && counter === comment.counter) {
                                    index_lookup = index
                                }
                            });
                            if (index_lookup !== false) {
                                this.comments.splice(index_lookup, 1)
                            }
                            let new_counter = 0;
                            $.each(this.comments, function(index, comment) {
                                if (comment.screenshot_num === screenshot_num) {
                                    comment.setCounter(new_counter);
                                    new_counter++
                                }
                            })
                        }, this)
                    });
                    comment.add();
                    this.comments.push(comment)
                },
                hideComments: function() {
                    $.each(this.comments, function(index, comment) {
                        comment.hide()
                    })
                },
                hideCommentForm: function() {
                    $.each(this.comments, function(index, comment) {
                        comment.saveComment()
                    })
                    $.each(this.comments, function(index, comment) {
                        comment.hideForm()
                    })
                },
                removeComments: function() {
                    let screenshot_num = 0;
                    let new_comments = [];
                    $.each(this.comments, function(index, comment) {
                        if (comment.screenshot_num === screenshot_num) {
                            comment.destroy()
                        } else {
                            new_comments.push(comment)
                        }
                    });
                    this.comments = new_comments
                },
                removeFeedbckView: function() {
                    if (!this.custom_ui.feedback_view) {
                        return
                    }
                    this.custom_ui.feedback_view.remove();
                    this.custom_ui.feedback_view = null
                },
                addControls: function () {
                    console.log("GigaTester: addControls called");
                    if (this.custom_ui.events) {
                        return
                    }
                    $(document.getElementsByClassName('gigatester-ctrls-container')).unbind().on('click', function(e) {                        
                        let container = $(document.getElementsByClassName('gigatester-ctrl-item'));
                        if (!$(e.target).closest(container).length) {
                            if(!GigaTester_modal.confirmModal){
                                GigaTester_modal.showConfirmModal();
                            }
                            // $(document.getElementsByClassName('gigatester-ctrls-container')).attr("isopen", "false");
                            // GigaTester_modal.save_form_state = true;
                            if(!GigaTester_modal.configs.isRemote){
                                GigaTester_modal.custom_ui.button.show();
                            }
                        }
                    });
                    this.custom_ui.events = $("<gtdiv>").addClass("gigatester-ctrl-item");
                    this.setRoutings();
                    this.custom_ui.events.appendTo(this.custom_ui.element);
                    this.custom_ui.events.on("click", ".gigatester-ctrl-item-close", this.closeDialog.bind(this));
                    this.custom_ui.events.on("click", ".gigatester-ctrl-item-add-attachment", this.selectAttachment.bind(this));
                    this.custom_ui.events.on("click", "gtrating > gtdiv", this.selectRating.bind(this));
                    this.custom_ui.events.on("mouseenter", "gtrating > gtdiv", this.ratingPreview.bind(this));
                    this.custom_ui.events.on("mouseleave", "gtrating > gtdiv", this.unRatingPreview.bind(this));
                    this.custom_ui.events.on("change", ".gigatester-ctrl-item-attachment", this.uploadAttachment.bind(this));
                    this.custom_ui.events.on("submit", ".gigatester-ctrl-item-options", this.validateFields.bind(this));
                    this.custom_ui.events.on("change", 'select[name="category"]', this.changeCategory.bind(this));
                    this.custom_ui.events.on("change", 'select[name="severity"]', this.changeSeverity.bind(this));
                    this.custom_ui.events.on("click", ".gigatester-ctrl-item-video", this.startScreenRecorder.bind(this));
                    this.custom_ui.events.on("click", ".gigatester-ctrl-item-audio", this.recordAudio.bind(this));
                    this.custom_ui.events.on("click", ".gigatester-ctrl-item-screenshot", this.recordImage.bind(this));
                    this.custom_ui.events.on("click", ".gigatester-checkbox-container > gtdiv", this.toggleCheckbox.bind(this));
                    this.custom_ui.events.on("keyup", 'textarea[name="description"]', this.storeFormData.bind(this));
                    this.custom_ui.events.on("keyup", 'input[name="email"]', this.storeFormData.bind(this));
                    this.custom_ui.events.on("change", 'select[name="category"]', this.storeFormData.bind(this));
                    this.custom_ui.events.on("change", 'select[name="severity"]', this.storeFormData.bind(this));
                    this.custom_ui.events.on("click mouseup mousedown", function(e) {
                        e.stopPropagation()
                    })
                },
                showConfirmModal: function(){
                    let container = $(document.getElementsByClassName('gigatester-ctrl-item'));
                    
                    let html = '<gtdiv class="gigatester-ctrl-item-send-success" style="height:160px; "> ';
                    html += '<gtheader class="gigatester-ctrl-item-header" title="GigaTester">' +  GigaTester_StringRes.get("confirm_modal_header") + '</gtheader>'                                
                    html += '<p style="text-align:center;">' +  GigaTester_StringRes.get("confirm_modal_text") + '</p>'
                    html += '<div class="gigatester-confirm-modal-btns" >'
                    html += '<button class="gigatester-confirm-modal-save gigatester-input-btn" >' + '<span class="gigatester-ctrl-item-send-text">' +  GigaTester_StringRes.get("keep_changes_button") + '</span>' + '</button>'
                    html += '<button class="gigatester-confirm-modal-close gigatester-input-btn" >' + '<span class="gigatester-ctrl-item-send-text">' +  GigaTester_StringRes.get("discard_changes_button") + '</span>' + '</button>'
                    html += '</div>'
                    html += "<gtfooter>" + "<span>Powered by</span>" + "<span class='gigatester-footer'>" + " Cuvo" + "</span>" + "</a>" + "</gtfooter>";
                    html += '</gtdiv>';

                    container.append(html);
                    this.recording = false;
                    $(document.getElementsByClassName('gigatester-ctrl-item-close')).css('display', 'none');
                    $(document.getElementsByClassName('gigatester-dialog-scroll')).css('display', 'none');
                    // $(document.getElementsByClassName('gigatester-ctrl-item-r')).css('width','355px');                                
                    $(document.getElementById('gigatester-loader')).removeClass("gigatester-ctrl-item-loader")
                    GigaTester_modal.confirmModal = true;

                    $(document.getElementsByClassName('gigatester-confirm-modal-save')).on('click', function(e) {
                        GigaTester_modal.save_form_state = true;
                        container.hide();
                        $(document.getElementsByClassName('gigatester-ctrl-item-close')).css('display', 'block');
                        $(document.getElementsByClassName('gigatester-ctrls-container')).attr("isopen", "false");
                        $(document.getElementsByClassName('gigatester-dialog-scroll')).css('display', 'block');
                        $(document.getElementsByClassName('gigatester-ctrl-item-send-success')).css('display', 'none');
                    })
                    $(document.getElementsByClassName('gigatester-confirm-modal-close')).on('click', function(e) {                            
                        $(document.getElementsByClassName('gigatester-ctrls-container')).attr("isopen", "false");
                        let close_icon = $(document.getElementsByClassName('gigatester-ctrl-item-close'));
                        GigaTester_modal.save_form_state = false;
                        close_icon.trigger("click");                            
                    })

                },
                storeFormData: function(e) {
                    let field_name = $(e.currentTarget).attr("name");
                    if (field_name && typeof this.form_data[field_name] !== "undefined") {
                        this.form_data[field_name] = $(e.currentTarget).val()
                        if(field_name === 'category'){
                            if($(document.getElementsByClassName('gigatester-reason-checkboxes'))){
                                this.saveCheckedCategory();
                            }
                            // console.log(GigaTester_modal.form_type, "form type");
                            if (GigaTester_modal.form_type === "BUGS") {
                                let feedback_reason = '';
                                GigaTester_modal.configs.config_data[0].bugSettings.categories.map(items => {
                                    console.log($(e.currentTarget).val())
                                    console.log(GigaTester_modal.configs.selected_category);
                                    if($(e.currentTarget).val().length > 0){
                                    if(typeof $(e.currentTarget).val() === 'string'){
                                        // console.log('target is string')
                                        if(items.name.trim() == $(e.currentTarget).val().trim()){
                                        items.feedbacks.forEach( function(value, index){
                                            feedback_reason += `<input id="gt-cb-reason${index}" class="gigatester-reason-checkboxes" type="checkbox"> <label for="gt-cb-reason${index}" class="gigatester-reason-labels" id="gigatester-reason-label">${value}</label> <br>`
                                        })
                                        $(document.getElementById('gigatester_category_standard_feedback')).html(feedback_reason);
                                    }
                                }
                                    else{
                                    $(e.currentTarget).val().map(category => {
                                    if(items.name.trim() == category.trim()){
                                            feedback_reason += `<div>${category}</div>`
                                        items.feedbacks.forEach( function(value, index){
                                            feedback_reason += `<input id="gt-cb-reason${index}" class="gigatester-reason-checkboxes" type="checkbox"> <label for="gt-cb-reason${index}" class="gigatester-reason-labels" id="gigatester-reason-label">${value}</label> <br>`
                                        })
                                        $(document.getElementById('gigatester_category_standard_feedback')).html(feedback_reason);
                                    }
                                 })
                                }}
                                    else{
                                        if($(document.getElementsByClassName('gigatester-reason-checkboxes'))){
                                            $(document.getElementsByClassName('gigatester-reason-checkboxes')).prev().remove();
                                            $(document.getElementsByClassName('gigatester-reason-checkboxes')).remove();
                                            $(document.getElementsByClassName('gigatester-reason-labels')).next().remove("br");
                                            $(document.getElementsByClassName('gigatester-reason-labels')).remove();
                                        }
                                    }
                                })
                            }
                            else if(GigaTester_modal.form_type === "FEEDBACK"){
                                let feedback_reason = '';
                                GigaTester_modal.configs.config_data[0].feedbackSettings.categories.map(items => {
                                    if($(e.currentTarget).val().length > 0){
                                    if(typeof $(e.currentTarget).val() === 'string'){
                                        // console.log('target is string')
                                        if(items.name.trim() == $(e.currentTarget).val().trim()){
                                        items.feedbacks.forEach( function(value, index){
                                            feedback_reason += `<input id="gt-cb-reason${index}" class="gigatester-reason-checkboxes" type="checkbox"> <label for="gt-cb-reason${index}" class="gigatester-reason-labels" id="gigatester-reason-label">${value}</label> <br>`
                                        })
                                        $(document.getElementById('gigatester_category_standard_feedback')).html(feedback_reason);
                                    }
                                    }else{
                                    $(e.currentTarget).val().map(category => {
                                        if(items.name.trim() == category.trim()){
                                                feedback_reason += `<div>${category}</div>`

                                        items.feedbacks.forEach( function(value, index){
                                            feedback_reason += ` <input id="gt-cb-reason${index}" class="gigatester-reason-checkboxes" type="checkbox"> <label for="gt-cb-reason${index}" class="gigatester-reason-labels" id="gigatester-reason-label">${value}</label> <br>`
                                        })
                                        $(document.getElementById('gigatester_category_standard_feedback')).html(feedback_reason);
                                    }
                                })
                                }
                            }
                            })
                            }
                                if(typeof GigaTester_modal.configs.selected_category === 'string'){
                                    $('.gigatester-reason-checkboxes').each(function () {
                                        if($(this).next("label").text() == GigaTester_modal.configs.selected_category){
                                                $(this).attr('checked', 'true')
                                            }
                                        })
                                }
                                else{
                                GigaTester_modal.configs.selected_category.map(function (value){
                                    // console.log(value);
                                    $('.gigatester-reason-checkboxes').each(function () {
                                        if($(this).next("label").text() == value){
                                                $(this).attr('checked', 'true')
                                            }
                                        })
                                    });
                            }
                        }
                    }
                },
                setCategory: function(){
                    GigaTester_modal.configs.categories = [];
                    if($(document.getElementsByClassName('gigatester-reason-checkboxes'))){
                        this.saveCheckedCategory();
                    }
                    if(GigaTester_modal.form_type === "BUGS"){
                        if(GigaTester_modal.configs.config_data[0].bugSettings && GigaTester_modal.configs.config_data[0].bugSettings.categories) {
                            let category = GigaTester_modal.configs.config_data[0].bugSettings.categories;
                            category.map(item => {
                                if(item.name && (item.name.trim().length > 0)) {
                                    GigaTester_modal.configs.categories.push(item.name.trim());
                                }
                            })
                        }
                        if(GigaTester_modal.configs.bugs_default_category){
                            GigaTester.setDefaultCategory(GigaTester_modal.configs.bugs_default_category.trim(), "BUGS")
                        }
                        else{
                            GigaTester_modal.form_data['category'] = [];
                        }
                    }
                    else if(GigaTester_modal.form_type === "FEEDBACK"){
                        if(GigaTester_modal.configs.config_data[0].feedbackSettings && GigaTester_modal.configs.config_data[0].feedbackSettings.categories) {
                            let category = GigaTester_modal.configs.config_data[0].feedbackSettings.categories;
                            category.map(item => {
                                if(item.name && (item.name.trim().length > 0)) {
                                    GigaTester_modal.configs.categories.push(item.name.trim());
                                }
                            })
                        }
                        if(GigaTester_modal.configs.feedback_default_category){
                            GigaTester.setDefaultCategory(GigaTester_modal.configs.feedback_default_category, "FEEDBACK")
                        }
                        else{
                            GigaTester_modal.form_data['category'] = 'category';
                        }
                    }
                    this.showSubCategory();
                },
                saveCheckedCategory: function(){
                    if($('.gigatester-reason-checkboxes:checked')){
                    // GigaTester_modal.configs.selected_category = [];
                    if(typeof GigaTester_modal.configs.selected_category === 'string'){
                        $('.gigatester-reason-checkboxes:checked').each(function () {
                            GigaTester_modal.configs.selected_category = ($(this).next("label").text());
                            console.log(GigaTester_modal.configs.selected_category, 'data push')
                        });
                    }else{
                    $('.gigatester-reason-checkboxes:checked').each(function () {
                        GigaTester_modal.configs.selected_category.push($(this).next("label").text());
                        console.log(GigaTester_modal.configs.selected_category, 'data push')
                    });
                }
                }
                    // console.log(GigaTester_modal.configs.selected_category, 'datas push')
                },
                showSubCategory: function(){
                    if($(document.getElementsByClassName('gigatester-reason-checkboxes'))){
                        this.saveCheckedCategory();
                    }
                    if (GigaTester_modal.form_type === "BUGS") {
                        GigaTester_modal.configs.config_data[0].bugSettings.categories.map(items => {
                            // console.log("Gigatester:" + items.name)
                            if($(document.getElementById('category')).val()){
                                if($(typeof document.getElementById('category')).val() === 'string'){
                                    let feedback_reason = '';
                                    if(items.name.trim() == $(document.getElementById('category')).val().trim()){
                                        feedback_reason += `<div>${category}</div>`;
                                    items.feedbacks.forEach( function(value, index){
                                        feedback_reason += `<input id="gt-cb-reason${index}" class="gigatester-reason-checkboxes" type="checkbox"> <label for="gt-cb-reason${index}" class="gigatester-reason-labels" id="gigatester-reason-label">${value}</label> <br>`
                                    })
                                    $(document.getElementById('gigatester_category_standard_feedback')).html(feedback_reason);
                                }
                                }
                                else if( $.isArray($(typeof document.getElementById('category')).val())){
                                let feedback_reason = '';
                                $(document.getElementById('category')).val().map(category=> {
                                    if(items.name.trim() == category.trim()){
                                        feedback_reason += `<div>${category}</div>`;
                                    items.feedbacks.forEach( function(value, index){
                                        feedback_reason += `<input id="gt-cb-reason${index}" class="gigatester-reason-checkboxes" type="checkbox"> <label for="gt-cb-reason${index}" class="gigatester-reason-labels" id="gigatester-reason-label">${value}</label> <br>`
                                    })
                                    $(document.getElementById('gigatester_category_standard_feedback')).html(feedback_reason);
                                }
                            });
                        }
                        }
                        })
                    }
                    else if (GigaTester_modal.form_type === "FEEDBACK") {

                        GigaTester_modal.configs.config_data[0].feedbackSettings.categories.map(items => {
                            if($(document.getElementById('category')).val()){
                                if($(typeof document.getElementById('category')).val() === 'string'){
                                    let feedback_reason = '';
                                    if(items.name.trim() == $(document.getElementById('category')).val().trim()){
                                        feedback_reason += `<div>${category}</div>`;
                                    items.feedbacks.forEach( function(value, index){
                                        feedback_reason += `<input id="gt-cb-reason${index}" class="gigatester-reason-checkboxes" type="checkbox"> <label for="gt-cb-reason${index}" class="gigatester-reason-labels" id="gigatester-reason-label">${value}</label> <br>`
                                    })
                                    $(document.getElementById('gigatester_category_standard_feedback')).html(feedback_reason);
                                }
                                }
                                else if( $.isArray($(typeof document.getElementById('category')).val())){
                                let feedback_reason = '';
                                $(document.getElementById('category')).val().map(category=> {
                                    if(items.name.trim() == category.trim()){
                                        feedback_reason += `<div>${category}</div>`;
                                    items.feedbacks.forEach( function(value, index){
                                        feedback_reason += `<input id="gt-cb-reason${index}" class="gigatester-reason-checkboxes" type="checkbox"> <label for="gt-cb-reason${index}" class="gigatester-reason-labels" id="gigatester-reason-label">${value}</label> <br>`
                                    })
                                    $(document.getElementById('gigatester_category_standard_feedback')).html(feedback_reason);
                                }
                                });
                            }
                            }
                        })
                    }
                    if(typeof GigaTester_modal.configs.selected_category === 'string'){
                        $('.gigatester-reason-checkboxes').each(function () {
                            if($(this).next("label").text() == GigaTester_modal.configs.selected_category){
                                    $(this).attr('checked', 'true')
                                }
                            })
                    }
                    else{
                    GigaTester_modal.configs.selected_category.map(function (value){
                        console.log(value);
                        $('.gigatester-reason-checkboxes').each(function () {
                            if($(this).next("label").text() == value){
                                    $(this).attr('checked', 'true')
                                }
                            })
                        });
                }
                },
                saveSubCategory: function() {
                    // if($(document.getElementsByClassName('gigatester-reason-checkboxes'))){
                    //     this.saveCheckedCategory();
                    // }
                    // if($(document.getElementsByClassName('gigatester-reason-checkboxes'))){
                    //     $(document.getElementsByClassName('gigatester-reason-checkboxes')).remove();
                    //     $(document.getElementsByClassName('gigatester-reason-labels')).next().remove("br");
                    //     $(document.getElementsByClassName('gigatester-reason-labels')).remove();
                    // }
                    let feedback_reason = '';
                    if (GigaTester_modal.form_type === "BUGS") {
                        GigaTester_modal.configs.config_data[0].bugSettings.categories.map(items => {
                            // console.log($(document.getElementById('category')).val());
                            if($(document.getElementById('category')).val()){
                                if(typeof $(document.getElementById('category')).val() === 'string'){
                                    if(items.name.trim() == $(document.getElementById('category')).val().trim()){
                                        items.feedbacks.forEach( function(value, index){
                                            feedback_reason += `<input id="gt-cb-reason${index}" class="gigatester-reason-checkboxes" type="checkbox"> <label for="gt-cb-reason${index}" class="gigatester-reason-labels" id="gigatester-reason-label">${value}</label> <br>`
                                        })
                                        console.log('saved standard feedback', GigaTester_modal.configs.selected_category);
                                        $(document.getElementById('gigatester_category_standard_feedback')).html(feedback_reason);
                                    }
                                }
                                else{
                                $(document.getElementById('category')).val().map(category => {
                                if(items.name.trim() == category.trim()){
                                    feedback_reason += `<div>${category}</div>`;
                                    items.feedbacks.forEach( function(value, index){
                                        feedback_reason += `<input id="gt-cb-reason${index}" class="gigatester-reason-checkboxes" type="checkbox"> <label for="gt-cb-reason${index}" class="gigatester-reason-labels" id="gigatester-reason-label">${value}</label> <br>`
                                    })
                                    console.log('saved standard feedback', GigaTester_modal.configs.selected_category);
                                    $(document.getElementById('gigatester_category_standard_feedback')).html(feedback_reason);
                                }
                            });
                        }
                            }
                        })
                    }
                    else if(GigaTester_modal.form_type === "FEEDBACK"){
                        GigaTester_modal.configs.config_data[0].feedbackSettings.categories.map(items => {
                            if($(document.getElementById('category')).val()){
                                if(typeof $(document.getElementById('category')).val() === 'string'){
                                    if(items.name.trim() == $(document.getElementById('category')).val().trim()){
                                        items.feedbacks.forEach( function(value, index){
                                            feedback_reason += `<input id="gt-cb-reason${index}" class="gigatester-reason-checkboxes" type="checkbox"> <label for="gt-cb-reason${index}" class="gigatester-reason-labels" id="gigatester-reason-label">${value}</label> <br>`
                                        })
                                        console.log('saved standard feedback', GigaTester_modal.configs.selected_category);
                                        $(document.getElementById('gigatester_category_standard_feedback')).html(feedback_reason);
                                    }
                                }
                                else{
                                $(document.getElementById('category')).val().map(category => {
                                if(items.name.trim() == category.trim()){
                                    feedback_reason += `<div>${category}</div>`;
                                    items.feedbacks.forEach( function(value, index){
                                        feedback_reason += `<input id="gt-cb-reason${index}" class="gigatester-reason-checkboxes" type="checkbox"> <label for="gt-cb-reason${index}" class="gigatester-reason-labels" id="gigatester-reason-label">${value}</label> <br>`
                                    })
                                    $(document.getElementById('gigatester_category_standard_feedback')).html(feedback_reason);
                                }
                            });
                        }
                            }
                        })
                    }
                    if(typeof GigaTester_modal.configs.selected_category === 'string'){
                        $('.gigatester-reason-checkboxes').each(function () {
                            if($(this).next("label").text() == GigaTester_modal.configs.selected_category){
                                    $(this).attr('checked', 'true')
                                }
                            })
                    }
                    else{
                    GigaTester_modal.configs.selected_category.map(function (value){
                        console.log(value);
                        $('.gigatester-reason-checkboxes').each(function () {
                            if($(this).next("label").text() == value){
                                    $(this).attr('checked', 'true')
                                }
                            })
                        });
                }
                    },

                removeGTControls: function() {
                    if (!this.custom_ui.events) {
                        return
                    }
                    this.custom_ui.events.remove();
                    this.custom_ui.events = null
                },
                setRoutings: function() {
                    console.log("GigaTester: setRoutings called");
                    let html = '<gtclose class="gigatester-ctrl-item-close" title="' + GigaTester_StringRes.get("close") + '">' + GigaTester_Icons.close_icon + "</gtclose>";
                    html += '<gtdiv class="gigatester-dialog-scroll">';
                    html += '<gtheader class="gigatester-ctrl-item-header" title="GigaTester">'+ GigaTester_StringUtils.escapeSpecialChars(this.configs.title) + '</gtheader>'
                    html += this.configs.logo ? '<img class="gigatester-ctrl-item-logo" src="' + GigaTester_StringUtils.escapeSpecialChars(this.configs.logo) + '">' : "";
                    html += '<gtdiv class="gigatester-ctrl-item-step" data-step="2"></gtdiv>';
                    html += "<gtfooter>" + "<span>Powered by</span>" + "<span class='gigatester-footer'>" + " Cuvo" + "</span>" + "</a>" + "</gtfooter>";
                    html += '</gtdiv>';
                    this.custom_ui.events.html(html);
                    this.setDialogForm();
                },
                // setMultiSelect: function(){
                //     GigaTester_modal.multiSelect = 'true';
                //     $('#category').val(['']).trigger('change');
                //     setTimeout(()=> {GigaTester_modal.setDialogForm();},100);
                // },
                setDialogForm: function () {
                    console.log("GigaTester: setDialogForm called");
                    let form_settings = this.getFormSettings(this.form_type);
                    this.checkSessionStorage();
                    // console.log('GigaTester : dialog refresh mode', GigaTester_modal.set_screen_default_category)
                    if(GigaTester_modal.set_screen_default_category){
                        GigaTester_modal.setCategory();
                    }
                    let display_screenshot = form_settings.allow_screenshot;
                    let display_audio = form_settings.allow_audio;
                    let display_video = form_settings.allow_video && this.configs.has_video && !GigaTester_modal.is_mobile;
                    let display_attachment = form_settings.allow_attachment  && typeof FileReader !== "undefined";
                    let data_item = 0;
                    let details = navigator.userAgent;
                    let regexp = /android|iphone|kindle|ipad/i;
                    let isMobileDevice = regexp.test(details);
                    let platformName = platform.name.toLowerCase();
                    let platformVersion = platform.version.split('.')[0];
                    switch(platformName) {
                        case 'chrome':
                            if(parseInt(platformVersion,10) < 50){
                                console.log('GigaTester: media unsupported browser version');
                                display_screenshot = false;
                                display_video = false;
                                display_audio = false;
                            }
                            break;
                        case 'firefox':
                            if(parseInt(platformVersion,10) < 26){
                                console.log('GigaTester: media unsupported browser version');
                                display_screenshot = false;
                                display_video = false;
                                display_audio = false;
                            }
                            break;
                        case 'opera':
                            if(parseInt(platformVersion,10) < 36){
                                console.log('GigaTester: media unsupported browser version');
                                display_screenshot = false;
                                display_video = false;
                                display_audio = false;
                            }
                            break;
                        case 'safari':
                            if(parseInt(platformVersion,10) < 14){
                                console.log('GigaTester: media unsupported browser version');
                                display_screenshot = false;
                                display_video = false;
                                display_audio = false;
                            }
                            break;
                        case 'ie':
                                display_screenshot = false;
                                display_video = false;
                                display_audio = false;
                                break;
                        case 'edge':
                            if(parseInt(platformVersion,10) < 79){
                                console.log('GigaTester: media unsupported browser version');
                                display_screenshot = false;
                                display_video = false;
                                display_audio = false;
                            }
                            break;
                        default:
                            display_screenshot = true;
                            display_video = true;
                            display_audio = true;
                    }
                    if (isMobileDevice) {
                        console.log("GigaTester: a Mobile Device : " + navigator.userAgent);
                        display_screenshot = false;
                        display_video = false;
                    }
                    data_item += display_screenshot ? 1 : 0;
                    data_item += display_video ? 1 : 0;
                    data_item += display_audio ? 1 : 0;
                    data_item += display_attachment ? 1 : 0;
//                    let default_name = this.form_data.name || GigaTester.name || GigaTester_modal.name
                    let default_email = this.form_data.email || GigaTester.email
//                    let default_title = this.form_data.title || "";
                    let default_description = this.form_data.description || "";
                    let default_category = this.form_data.category || GigaTester.category || GigaTester_modal.categories || "";
                    let default_severity = this.form_data.severity || GigaTester.severity || GigaTester_modal.severity || "";
                    let default_rating = this.form_data.rating || 0;
                    let severity_options = "";
                    let category_options = "";
                    if (form_settings.display_category) {
                        this.configs.categories.forEach(function(category) {
                            category_options += "<option>" + category + "</option>"
                        }.bind(this))
                    }
                    if (form_settings.display_severity) {
                        this.configs.severities.forEach(function(severity) {
                            severity_options += "<option>" + severity + "</option>"
                        }.bind(this))
                    }
                    let html = "";
                    html += '<form class="gigatester-ctrl-item-options">'
                     + (form_settings.rating_title_message ? '<div class="gigatester-ctrl-item-help-message">' + GigaTester_StringUtils.escapeSpecialChars(form_settings.rating_title_message) + "</div>" : "")
                     + (form_settings.rating_type ? "<gtrating>" + '<gtdiv data-rating="star_1" class="inactive">' + GigaTester_Icons.star_icon + "</gtdiv>" + '<gtdiv data-rating="star_2" class="inactive">' + GigaTester_Icons.star_icon + "</gtdiv>" + '<gtdiv data-rating="star_3" class="inactive">' + GigaTester_Icons.star_icon + "</gtdiv>" + '<gtdiv data-rating="star_4" class="inactive">' + GigaTester_Icons.star_icon + "</gtdiv>" + '<gtdiv data-rating="star_5" class="inactive">' + GigaTester_Icons.star_icon + "</gtdiv>" + "</gtrating>"
                     + "<gtdiv class='gigatester-ctrl-item-loader-toggle'><gtloader id='gigatester-loader'></gtloader></gtdiv>" : "")
                     + '<gtdiv class="gigatester-ctrl-item-form"' + (form_settings.rating_type && form_settings.rating_mandatory ? ' style="display:none;"' : "") + ">"
                    + (form_settings.bug_title_message ? '<gtheader class="gigatester-bug-help-message"> ' + form_settings.bug_title_message + '</gtheader>' : "")
                    + (form_settings.reqFeature_title_msg ? '<gtheader class="gigatester-bug-help-message"> ' + form_settings.reqFeature_title_msg + '</gtheader>' : "")
                     + '<gtdiv class="gigatester-ctrl-item-form-full"><gtdiv class="gigatester-ctrl-item-form-left">'
                     + (form_settings.email_field ? '<input type="email" name="email" placeholder="' + GigaTester_StringRes.get("your_email") + '"' + (form_settings.email_field_mandatory ? " required" : "") + (GigaTester.email ? form_settings.hide_email ? " hidden": "" : "") + (form_settings.email_field_disable ? " disabled" : "") + ">" : "")
                     + (form_settings.display_category ? '<select  id="category" name="category" ' + (form_settings.category_field_mandatory ? " required" : "") + ">"
                     + '<option value="category" selected disabled>' + GigaTester_StringRes.get("select_category") + "</option>"
                     + category_options + "</select>" : "")
                     + (form_settings.display_category ? '<gtdiv id="gigatester_category_standard_feedback"></gtdiv>' : '')
                     + (form_settings.display_severity ? '<select id="severity" name="severity" style="width:100%"' + (form_settings.severity_field_mandatory ? " required" : "") + ">"
                     + '<option value="severity" selected disabled>' + GigaTester_StringRes.get("select_severity") + "</option>"
                     + severity_options + "</select>" : "")
                     + (form_settings.comment_field ? '<textarea name="description" data-gramm_editor="false" placeholder="' + (GigaTester_StringUtils.escapeSpecialChars(form_settings.comment_field_placeholder) || GigaTester_StringRes.get("your_comment")) + (form_settings.comment_field_mandatory ? " *" : "") + '"' + (form_settings.comment_field_mandatory ? " required" : "") + "></textarea>" : "")
                     + '</gtdiv><gtdiv class="gigatester-ctrl-item-form-right">'
                     + '<gtdiv class="gigatester-ctrl-item-preview-placeholder">' + GigaTester_StringRes.get("attachment_msg") + '</gtdiv>'
                     + (display_screenshot || display_audio || display_video || display_attachment ?
                        '<gtdiv class="gigatester-ctrl-item-attach-actions" data-item="' + data_item + '">' + "<gtdiv>"
                     + (display_screenshot ? '<btn class="gigatester-ctrl-item-screenshot">' + GigaTester_Icons.screenshot_icon + "<gtdiv>" + GigaTester_StringRes.get("attach_screenshot") + "</gtdiv>"
                     + "<gttooltip>" + GigaTester_StringRes.get("attach_screenshot") + "</gttooltip>" + '<div class="gigatester-screenshot-preview-checkmark">' + GigaTester_Icons.checkmark + "</div>" + "</btn>" : "")
                     + (display_audio ? '<btn class="gigatester-ctrl-item-audio">' + GigaTester_Icons.mic_icon + "<gtdiv>" + GigaTester_StringRes.get("capture_audio") + "</gtdiv>"
                     + "<gttooltip>" + GigaTester_StringRes.get("capture_audio") + "</gttooltip>" + '<div class="gigatester-screenshot-preview-checkmark">' + GigaTester_Icons.checkmark + "</div>" + "</btn>" : "")
                     + (display_video ?  '<btn class="gigatester-ctrl-item-video">' + GigaTester_Icons.video_icon + "<gtdiv>" + GigaTester_StringRes.get("capture_screen_recording") + "</gtdiv>"
                     + "<gttooltip>" + GigaTester_StringRes.get("capture_screen_recording") + "</gttooltip>" + '<div class="gigatester-screenshot-preview-checkmark">' + GigaTester_Icons.checkmark + "</div>" + "</btn>" : "")
                     + (display_attachment ?'<btn class="gigatester-ctrl-item-add-attachment">' + GigaTester_Icons.paperclip_icon + "<gtdiv>" + GigaTester_StringRes.get("attach_file") + "</gtdiv>"
                     + "<gttooltip>" + GigaTester_StringRes.get("attach_file") + "</gttooltip>" + '<div class="gigatester-screenshot-preview-checkmark">' + GigaTester_Icons.checkmark + "</div>" + "</btn>" : "")
                     + "</gtdiv>" + '<input type="file" class="gigatester-ctrl-item-attachment">' + "</gtdiv>" : "")
                     + '<button class="gigatester-ctrl-item-send gigatester-input-btn">' + '<span class="gigatester-ctrl-item-send-progress"></span>' + '<span class="gigatester-ctrl-item-send-text">' +  GigaTester_StringRes.get("send") + "</span>" + "</button>"
                     + '</gtdiv></gtdiv>'
                     + "</gtdiv>"
                     + "</form>";
                    this.custom_ui.events.find('.gigatester-ctrl-item-step').html(html);
                //    $(document.getElementById('category1')).select2();
                // $( document ).ready(function() {
                //     // console.log("ready!");
                //     $('#category').select2({
                //         placeholder: 'Select a category',
                //         dropdownParent: $('.gigatester-ctrl-item-form-left'),
                //         dropdownCssClass: ':all:',
                //         width: 'resolve'
                //     });
                // });
                // $('#category').val(['']).trigger('change');
                    if(GigaTester_modal.configs.rating_limit > 4){
                        this.custom_ui.events.find(".gigatester-ctrl-item-form").show();
                        this.focusControls();
                    }
                    if (default_rating) {
                        this.custom_ui.events.find('gtrating gtdiv[data-rating="' + default_rating + '"]').click()
                    }
                    if (default_email) {
                        this.custom_ui.events.find('.gigatester-ctrl-item-step').find('input[name="email"]').val(default_email)
                    }
                    if (default_description) {
                        this.custom_ui.events.find('.gigatester-ctrl-item-step').find('textarea[name="description"]').val(default_description)
                    }
                    // if(!GigaTester_modal.set_screen_default_category){
                    if (default_category) {
                        // console.log(default_category, "form defaults")
                        // console.log(GigaTester_modal.configs.selected_category);
                        if(typeof default_category === 'string'){
                            this.custom_ui.events.find('.gigatester-ctrl-item-step').find('select[name="category"]').val(default_category.trim())
                        }
                        else if ($.isArray(default_category)){
                            default_category.map(value => {
                                this.custom_ui.events.find('.gigatester-ctrl-item-step').find('select[name="category"]').val(value)
                            })
                        }
                        // this.custom_ui.events.find('.gigatester-ctrl-item-step').find('select[name="category"]').val(default_category).trigger('change');

                        var select = document.getElementById('category');
                        // console.log(this.custom_ui.events.find('.gigatester-ctrl-item-step').find('select[name="category"]').val())
                    }
                    // }
                    if (default_severity) {
                        this.custom_ui.events.find('.gigatester-ctrl-item-step').find('select[name="severity"]').val(default_severity)
                    }
                    // console.log(default_email, "default email");
                    this.custom_ui.events.find('.gigatester-ctrl-item-step').find('.gigatester-ctrl-item-preview-placeholder').css('border', '1px solid #bfbfbf')
                    setTimeout(()=>{
                        GigaTester_modal.saveSubCategory();
                    },10);
                },
                openForm: function(form_type) {
                    this.form_type = form_type;
                    this.setDialogForm();
                    this.custom_ui.events.find('.gigatester-ctrl-item-step').show();
                    if(GigaTester_modal.configs.rating_limit > 4){ //TODO: should check for >= 5
                        this.custom_ui.events.find(".gigatester-ctrl-item-form").show();
                        this.focusControls();
                    }
                    this.focusControls();
                },
                recordImage: async function(e){
                    GigaTester_modal.canvas_mode = true;
                    GigaTester_modal.saveCheckedCategory();
                    GigaTester_modal.set_screen_default_category = false;
                    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                        console.log("GigaTester: This browser does not support media capture API");
                    } else {
                        GigaTester_modal.hideControls();
                        navigator.mediaDevices.getDisplayMedia({
                            audio: false,
                            video: true,
                            preferCurrentTab: true,
                            oneway: true,
                            displaySurface: ['application', 'browser', 'monitor', 'window'],
                        }).then(function(stream){
                            GigaTester_modal.Draw_Tools.image_capture = 'true';
                            GigaTester_modal.Draw_Tools.removeTools()
                            stream.onended = () => {
                                console.info("GigaTester: Recording has ended");
                            };

                            stream.onerror = () => {
                                console.log('GigaTester: Error occuring during stream');
                            }
                            const recorder = new MediaRecorder(stream);
                            const chunks = [];
                            recorder.ondataavailable = e => {
                                chunks.push(e.data);
                                console.log('GigaTester: image recorder state ',recorder.state)
                            }
                            if(stream){
                                recorder.start();
                                const videoTracks = stream.getVideoTracks();
                                if (videoTracks && videoTracks[0]) {
                                    const track = videoTracks[0];
                                    track.addEventListener('ended', () => console.log('GigaTester: screensharing has ended'))
                                    // Wrapping in a try catch to preform most optimal solution first
                                    // before attempting less optimal solution
                                    try {
                                        const imageCapture = new ImageCapture(track);
                                        setTimeout(() => { imageCapture.grabFrame()
                                            .then((screenshot) => {
                                                GigaTester_modal.custom_ui.element.attr("drawing", "false");
                                                GigaTester_modal.Draw_Tools.image_capture = 'false';
                                                GigaTester_modal.screenshotImage(screenshot);
                                            })
                                            .catch((error) => console.error(error));
                                        },200);
                                    } catch(error) {
                                        console.warn('GigaTester: ImageCapture not supported on this browser');
                                        recorder.onstop = e => {
                                            GigaTester_modal.custom_ui.element.attr("drawing", "false");
                                            const completeBlob = new Blob(chunks, { type: "video/mp4" });
                                            const src = URL.createObjectURL(completeBlob);
                                            GigaTester_modal.Draw_Tools.image_capture = 'false';
                                            console.log('GigaTester: Image blob url',src);
                                            const image_overlay = $('<gtdiv id="gigatester_video_player"><gtdiv></gtdiv></gtdiv>');
                                            const video = $('<video width="0" height="0" id="gigatester_image_preview_player" preload="auto" src="' + src + '"></video>');
                                            const video_close = $('<btn id="gigatester_video_player_close">').html(GigaTester_Icons.close_icon);
                                            video_close.appendTo(image_overlay);
                                            video.insertAfter($(document.getElementsByClassName('gigatester-ctrl-item-attach-actions')));
                                            setTimeout(()=> (GigaTester_modal.screenshotImage(video.get(0))), 700);
                                        };
                                    }
                                } else {
                                    // TODO: add logic for if failure to capture video
                                    console.log('backed out of capture video')
                                }
                                setTimeout(()=> {
                                    recorder.stop(),
                                    stream.getTracks().forEach(track => track.stop());  // Stop all tracks from the MediaStream
                                }, 700);
                            }
                            console.log('GigaTester: image recording started')
                        })
                        .catch(function(err) {
                            console.log(err, 'permision to screen record was denied')
                            GigaTester_modal.setNotifyStatus("Screen capture error: permision to screen record was denied");
                            setTimeout(()=> {GigaTester_modal.clearNotifyStatus()}, 6000);
                            GigaTester_modal.set_screen_default_category = false;
                            GigaTester_modal.recording = false;
                            if (!GigaTester_modal.configs.isRemote) {
                                GigaTester_modal.custom_ui.button.show();
                            }
                            GigaTester_modal.showControls();
                            GigaTester_modal.setDialogForm();
                            GigaTester_modal.saveCheckedCategory();
                            if(GigaTester_modal.form_data.rating){
                                GigaTester_modal.selectedRating();
                            }
                            /* handle the error */
                        })
                    }
                },
                screenshotImage: function (rawImage) {
                    //canvas and image is 85% of viewport if safari, otherwise 95% of viewport
                    const reduction_factor = GigaTester_modal.configs.isSafari ? 0.85 : 0.95;
                    const final_width = Math.round(window.innerWidth * reduction_factor);
                    const final_height = Math.round(window.innerHeight * reduction_factor);
                    console.log("image [width, height] = [" + final_width + ", " + final_height + "]" );

                    const canvas = document.createElement("canvas");
                    const context = canvas.getContext("2d");
                    canvas.width = final_width;
                    canvas.height = final_height;
                    if(rawImage && context){
                        context.drawImage(rawImage, 0, 0, final_width, final_height);
                        const frame = canvas.toDataURL("image/jpeg");
                        // console.log('GigaTester: [Info] Img base64 value ', frame);
                        const image_overlay = $('<gtdiv id="gigatester_screencapture_area"></gtdiv>');
                        image_overlay.css({width: final_width, height: final_height});
                        const image =  $('<image id="gigatester_image_preview" preload="auto" src="' + frame + '"></image>');
                        image.appendTo(image_overlay);
                        const screencapture_dialog = $('<gtdiv id="gigatester_screencapture_dialog"></gtdiv>');
                        image_overlay.appendTo(screencapture_dialog);
                        screencapture_dialog.appendTo(document.body);
                        this.addCanvas();
                        GigaTester_modal.scrollDisable();
                    }
                },
                finalScreenshot: async function(){
                    GigaTester_modal.setNotifyStatus("Taking screenshot...");
                    const annoted = document.getElementById('gigatester_screencapture_area')
                    html2canvas(annoted , {
                        useCORS: true,
                        allowTaint : true,
                        width: annoted.width,
                        height: annoted.height,
                    } ).then(function(canvas) {
                        if(canvas){
                            const image = new Image();
                            const base64Image = canvas.toDataURL();
                            image.onload = () => {
                                GigaTester_modal.removeGToverlay();
                                GigaTester_modal.hideComments();
                                GigaTester_modal.Draw_Tools.removeTools();
                                GigaTester_modal.showControls();
                                GigaTester_modal.recording = true;
                                GigaTester_modal.form_data.categories = GigaTester_modal.form_data.categories;
                                GigaTester_modal.form_data.rating =  GigaTester_modal.form_data.rating;
                                GigaTester_modal.setDialogForm();
                                GigaTester_modal.set_screen_default_category = true;
                                if(GigaTester_modal.form_data.rating){
                                    GigaTester_modal.selectedRating();
                                }
                                GigaTester_modal.clearNotifyStatus();
                                const image_overlay = $('<gtdiv id="gigatester_images_player"><gtdiv></gtdiv></gtdiv>');
                                const image = $('<image id="gigatester_images_preview_player" width=300 height=auto src="' + base64Image + '"></image>');
                                const image_close = $('<button id="gigatester_remove_attachment_btn">').html(GigaTester_Icons.trash_bin_icon);
                                $(document.getElementsByClassName('gigatester-ctrl-item-preview-placeholder')).text("");
                                $(document.getElementsByClassName('gigatester-ctrl-item-preview-placeholder')).css('border', 'none')
                                image.appendTo($(document.getElementsByClassName('gigatester-ctrl-item-preview-placeholder')));
                                image_close.insertAfter(image);
                                GigaTester_modal.loadImage(base64Image);
                                image_close.on("click", function() {
                                    image.remove();
                                    GigaTester_modal.removeComments();
                                    GigaTester_modal.form_data.image_file = '';
                                    GigaTester_modal.set_screen_default_category = false;
                                    GigaTester_modal.recording = false;
                                    GigaTester_modal.saveCheckedCategory();
                                    image_close.remove();
                                    GigaTester_modal.setDialogForm();
                                    GigaTester_modal.saveSubCategory();
                                    if(GigaTester_modal.form_data.rating){
                                        GigaTester_modal.selectedRating();
                                    }
                                })
                                // console.log(base64Image, 'final screenshot');
                            };
                            image.src = base64Image;
                        }
                    });
                },
                getTimerStr: function() {
                    // console.log(GigaTester_modal.configs.audio_time)
                    let min = Math.floor(GigaTester_modal.configs.audio_time / 60);
                    let sec = GigaTester_modal.configs.audio_time - min * 60;
                    if (min < 10) {
                        min = "0" + min
                    }
                    if (sec < 10) {
                        sec = "0" + sec
                    }
                    return min + ":" + sec
                },
                startTimer: function() {
                    let timer_button = $(document.getElementById('gigatester-audio-timer-btn'))
                    // console.log(timer_button.text())
                    this.timer_timeout = setInterval(function() {
                        let timer_text = this.getTimerStr();
                        timer_button.text(timer_text);
                        GigaTester_modal.configs.audio_time--;
                        if (timer_text === "00:00") {
                            clearInterval(this.timer_timeout);
                            $(document.getElementById('gigatester_audio_record_player_stop')).trigger('click')
                        }
                    }.bind(this), 1e3)
                },
                stopTimer: function() {
                    clearInterval(this.timer_timeout)
                },
                countDownStop: function() {
                    clearTimeout(this.count_down_timeout)
                },
                resetTimer: function() {
                    GigaTester_modal.configs.audio_time = GigaTester_modal.configs.config_data[0].videoAudioMaxDuration * 60 || 180;
                },
                recordAudio: async function(e){
                    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                        console.log("This browser does not support the API yet");
                      }
                    else{
                        navigator.mediaDevices.getUserMedia({
                            audio: true,
                            video: false
                        }).then(function(stream){
                        GigaTester_modal.recording = true;
                        GigaTester_modal.set_screen_default_category = false;
                        let audio_record_overlay = $('<div id="gigatester_audio_record_player"></div>');
                        let audio_record_text = $('<gtdiv id="gigatester_audio_record_player_text"></gtdiv>').html('Please click on Mic icon to stop audio recording.')
                        let timer_button = $("<btn id='gigatester-audio-timer-btn'>").addClass("gigatester-video-controls-timer").text(GigaTester_modal.getTimerStr());
                        let timer_info_text = $('<gtlabel class="gigatester-audio-timer-label">Remaining Record Time</gtlabel>')
                        let audio_record_stop = $('<btn id="gigatester_audio_record_player_stop">').html(GigaTester_Icons.mic_icon);
                        let audio_record_close = $('<btn id="gigatester_audio_record_player_close">').html(GigaTester_Icons.close_icon);
                        audio_record_close.appendTo(audio_record_overlay);
                        audio_record_stop.appendTo(audio_record_overlay);
                        timer_button.appendTo(audio_record_stop);
                        timer_info_text.appendTo(audio_record_stop);
                        audio_record_text.appendTo(audio_record_overlay);
                        audio_record_overlay.appendTo($(document.getElementsByClassName('gigatester-ctrl-item')));
                        const recorder = new MediaRecorder(stream);
                        GigaTester_modal.startTimer();
                        const chunks = [];
                        recorder.ondataavailable = e => chunks.push(e.data);
                        recorder.start();
                        audio_record_close.on('click', function(){
                            GigaTester_modal.recording = false;
                            recorder.stop()
                            stream.getTracks() // get all tracks from the MediaStream
                            .forEach( track => track.stop());
                            GigaTester_modal.stopTimer();
                            GigaTester_modal.countDownStop();
                            GigaTester_modal.resetTimer();
                            GigaTester_modal.set_screen_default_category = false;
                            GigaTester_modal.recording = false;
                            GigaTester_modal.saveCheckedCategory();
                            audio_record_overlay.remove();
                            GigaTester_modal.setDialogForm();
                            GigaTester_modal.saveSubCategory();
                            if(GigaTester_modal.form_data.rating){
                                GigaTester_modal.selectedRating();
                            }
                        })
                        audio_record_stop.on('click',function () {
                        recorder.stop()
                        stream.getTracks() // get all tracks from the MediaStream
                        .forEach( track => track.stop());
                        console.log('audio stopped')})
                        recorder.onstop = e => {
                            if(!GigaTester_modal.recording){
                                return
                            }
                            else{
                            GigaTester_modal.stopTimer();
                            GigaTester_modal.countDownStop();
                            GigaTester_modal.resetTimer();
                            $(audio_record_overlay).remove();
                            GigaTester_modal.form_data.rating =  GigaTester_modal.form_data.rating;
                            GigaTester_modal.form_data.comment_field =  GigaTester_modal.form_data.comment_field
                            GigaTester_modal.form_data.category = GigaTester_modal.form_data.category
                            GigaTester_modal.saveCheckedCategory();
                            GigaTester_modal.setDialogForm();
                            GigaTester_modal.saveSubCategory();
                            if(GigaTester_modal.form_data.rating){
                                GigaTester_modal.selectedRating();
                            }
                            GigaTester_modal.set_screen_default_category = true;
                            const completeBlob = new Blob(chunks, { type: "audio/wav" });
                            let src = URL.createObjectURL(completeBlob);
                            // console.log(src, 'audio blob')
                            let audio = $('<audio id="gigatester_audio_preview_player" controls loop autoplay preload="auto" src="' + src + '"></audio>');
                            let audio_close = $('<button id="gigatester_remove_attachment_btn">').html(GigaTester_Icons.trash_bin_icon);
                            $(document.getElementsByClassName('gigatester-ctrl-item-preview-placeholder')).text("");
                            audio.appendTo($(document.getElementsByClassName('gigatester-ctrl-item-preview-placeholder')));
                            $(document.getElementsByClassName('gigatester-ctrl-item-preview-placeholder')).css('border', 'none')
                            audio_close.insertAfter(audio);
                            GigaTester_modal.loadAudio(src);
                            audio_close.on("click", function() {
                                audio.remove();
                                GigaTester_modal.form_data.audio_file = '';
                                GigaTester_modal.recording = false;
                                GigaTester_modal.set_screen_default_category = false;
                                GigaTester_modal.saveCheckedCategory();
                                audio_close.remove();
                                GigaTester_modal.setDialogForm();
                                GigaTester_modal.saveSubCategory();
                                if(GigaTester_modal.form_data.rating){
                                    GigaTester_modal.selectedRating();
                                }
                            })
                          };
                        }
                        })
                        .catch(function(err){
                            console.log(err, 'audio err')
                            const errorMessage = err.toString();
                            errorMessage.replace('DOMException');
                            GigaTester_modal.setNotifyStatus(`Audio recording error: ${errorMessage}.Please grant browser access to record audio.`);
                            setTimeout(()=> {GigaTester_modal.clearNotifyStatus()}, 6000);
                        })

                    }
                },
                UUIDv4: function() {
                        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                            return v.toString(16);
                        });
                },
                loadAudio: async function(src) {
                    GigaTester_modal.form_data.audio_file = await fetch(src)
                    .then(r => r.blob()).then(blobFile => new File([blobFile], 'gt_audio_' + GigaTester_modal.UUIDv4() +'.wav', { type: 'audio/wav' }));
                    console.log(GigaTester_modal.form_dataaudio_file, 'audio file loaded');
                    this.custom_ui.events.find(".gigatester-ctrl-item-screenshot").attr('disabled', 'true');
                    this.custom_ui.events.find(".gigatester-ctrl-item-video").attr('disabled', 'true');
                    this.custom_ui.events.find(".gigatester-ctrl-item-audio").attr('disabled', 'true');
                    this.custom_ui.events.find(".gigatester-ctrl-item-add-attachment").attr('disabled', 'true');
                    this.custom_ui.events.find(".gigatester-ctrl-item-attach-actions").attr('disabled', 'true');
                },
                loadImage: async function(src) {
                    GigaTester_modal.form_data.image_file = await fetch(src)
                    .then(r => r.blob()).then(blobFile => new File([blobFile], 'gt_image_' + GigaTester_modal.UUIDv4() +'.jpeg', { type: 'image/jpeg' }));
                    // console.log(GigaTester_modal.form_data.image_file, 'image file loaded');
                    this.custom_ui.events.find(".gigatester-ctrl-item-screenshot").attr('disabled', 'true');
                    this.custom_ui.events.find(".gigatester-ctrl-item-video").attr('disabled', 'true');
                    this.custom_ui.events.find(".gigatester-ctrl-item-audio").attr('disabled', 'true');
                    this.custom_ui.events.find(".gigatester-ctrl-item-add-attachment").attr('disabled', 'true');
                    this.custom_ui.events.find(".gigatester-ctrl-item-attach-actions").attr('disabled', 'true');
                },
                submitVidCapture: function(video_blob) {
                    GigaTester_modal.video_blob = video_blob;
                    let src = window.URL.createObjectURL(video_blob);
                    GigaTester_modal.showControls();
                    setTimeout( function() {
                        GigaTester_modal.recording = false;
                        GigaTester_modal.form_data.rating =  GigaTester_modal.form_data.rating;
                        GigaTester_modal.setDialogForm();
                        GigaTester_modal.saveSubCategory();
                        if(GigaTester_modal.form_data.rating){
                            GigaTester_modal.selectedRating();
                        }
                        GigaTester_modal.set_screen_default_category = false;
                        GigaTester_modal.video_recording_mode = false;
                        let video_overlay = $('<div id="gigatester_video_player"><div></div></div>');
                        let video = $('<video id="gigatester_video_preview_player" '+ (GigaTester_modal.configs.isSafari ? '' : 'loop autoplay ' ) + 'controls preload="auto" src="' + src + '"></video>');
                        let video_close = $('<button id="gigatester_remove_attachment_btn">').html(GigaTester_Icons.trash_bin_icon);
                        $(document.getElementsByClassName('gigatester-ctrl-item-preview-placeholder')).text("");
                        $(document.getElementsByClassName('gigatester-ctrl-item-preview-placeholder')).css('border', 'none')
                        video.appendTo($(document.getElementsByClassName('gigatester-ctrl-item-preview-placeholder')));
                        video_close.insertAfter(video);
                        video_close.on("click", function() {
                            video_overlay.remove()
                            video.remove();
                            GigaTester_modal.form_data.video_file = '';
                            GigaTester_modal.recording = false;
                            GigaTester_modal.saveCheckedCategory();
                            video_close.remove();
                            GigaTester_modal.setDialogForm();
                            GigaTester_modal.saveSubCategory();
                            if(GigaTester_modal.form_data.rating){
                                GigaTester_modal.selectedRating();
                            }
                            GigaTester_modal.set_screen_default_category = false;
                        })
                        GigaTester_modal.custom_ui.events.find(".gigatester-ctrl-item-screenshot").attr('disabled', 'true');
                        GigaTester_modal.custom_ui.events.find(".gigatester-ctrl-item-video").attr('disabled', 'true');
                        GigaTester_modal.custom_ui.events.find(".gigatester-ctrl-item-audio").attr('disabled', 'true');
                        GigaTester_modal.custom_ui.events.find(".gigatester-ctrl-item-add-attachment").attr('disabled', 'true');
                        GigaTester_modal.custom_ui.events.find(".gigatester-ctrl-item-attach-actions").attr('disabled', 'true');

                    }, 100);
                    GigaTester_modal.showControls();
                    GigaTester_modal.loadVideo(src);

                },

                startScreenRecorder: function (e) {
                    if (typeof e !== "undefined" && $(e.currentTarget).attr("disabled")) {
                        return
                    }
                    GigaTester_modal.saveCheckedCategory();
                    this.hideControls();
                    Screen_Recorder.start({
                        onSubmit: GigaTester_modal.submitVidCapture,
                        onCancel: this.Draw_Tools.cancelGTcapture.bind(this.Draw_Tools),
                        timer: this.configs.screen_record_time,
                    })
                },
                loadVideo: async function(src) {
                    console.log('loaded video')
                    GigaTester_modal.form_data.video_file = await fetch(src)
                    .then(r => r.blob()).then(blobFile => new File([blobFile], 'gt_video_' + GigaTester_modal.UUIDv4() +'.mp4', { type: 'video/mp4' }));
                    // console.log(GigaTester_modal.form_data.video_file, 'video file loaded');
                },
                toggleAttachButtons: function() {
                    this.custom_ui.events.find(".gigatester-ctrl-item-attach-actions").toggle(this.custom_ui.events.find(".gigatester-ctrl-item-attach-actions btn[disabled]").length !== this.custom_ui.events.find(".gigatester-ctrl-item-attach-actions btn").length)
                },
                popOutDialog: function(){
                    console.log('GigaTester: popOutDialog called');
                    if(GigaTester_modal.save_form_state){
                        console.log(GigaTester_modal.form_type);
                        GigaTester_modal.custom_ui.element.css("display", "");
                        GigaTester_modal.openControls();
                        return;
                    }
                    if($(document.getElementsByClassName("gigatester-popup-dialog"))){
                        $(document.getElementsByClassName("gigatester-popup-dialog")).remove();
                    }
                    if($(document.getElementsByClassName("gigatester-popup-dialog-remote"))){
                        $(document.getElementsByClassName("gigatester-popup-dialog-remote")).remove();
                    }

                    let popup_dialog;
                    if (GigaTester_modal.configs.isRemote) {
                        popup_dialog =  $('<gtdiv class="gigatester-popup-dialog-remote"></gtdiv>');
                    } else {
                        popup_dialog = $('<gtdiv class="gigatester-popup-dialog"></gtdiv>');
                    }
                    let popup_dialog_close = $('<btn id="gigatester-popup-dialog-close">').html(GigaTester_Icons.close_icon);
                    let pop_up_title = $('<gtheader class="remote-title">' + GigaTester_modal.configs.title + '</gtheader>')

                    if(GigaTester_modal.configs.main_button_rotation && GigaTester_modal.configs.main_button_rotation !== ''
                        && GigaTester_modal.configs.main_button_rotation !== '0'){
                        let pop_up_rotate = '0';
                        if (GigaTester_modal.configs.main_button_rotation === '180') {
                            pop_up_rotate = '180'
                        } else if (GigaTester_modal.configs.main_button_rotation === '270') {
                            pop_up_rotate = '90'
                        } else if (GigaTester_modal.configs.main_button_rotation === '90') {
                            pop_up_rotate = '270'
                        }
                        popup_dialog[0].style.transform = `rotate(${pop_up_rotate}deg)`
                    }
                    const currentPosition = GigaTester_modal.configs.main_button_position;
                    const button = $(document.getElementsByClassName("gigatester-btn"));
                    const styleCheck = window.getComputedStyle(this.custom_ui.button[0]);
                    const btnWidth = parseInt(styleCheck.width, 10);
                    const btnHeight = parseInt(styleCheck.height, 10);

                    if (GigaTester_modal.configs.isRemote) {
                        popup_dialog[0].style.transform = 'rotate(0deg)';
                        popup_dialog.appendTo(document.body);
                    } else {
                        if (currentPosition === 'RIGHT_MIDDLE') {
                            popup_dialog[0].style.bottom = '-114px';
                            // popup_dialog[0].style.bottom = `-${(btnWidth - btnHeight) - 20}px`
                        } else if (currentPosition === 'RIGHT_BOTTOM') {
                            popup_dialog[0].style.left = `${btnWidth-150}px`;//'-55px'; //'-10px';
                            popup_dialog[0].style.bottom = '-114px';
                        } else if (currentPosition === 'LEFT_MIDDLE') {
                            popup_dialog[0].style.bottom = '-114px';
                        } else if (currentPosition === 'LEFT_BOTTOM') {
                            popup_dialog[0].style.left = `${btnWidth-50}px`;//'70px'; //'60px';
                            popup_dialog[0].style.bottom = '-114px';
                        } else if (currentPosition === 'BOTTOM_RIGHT' || currentPosition === 'BOTTOM_LEFT') {
                            popup_dialog[0].style.top = '-175px';
                        } else if (currentPosition === 'CUSTOM') {
                            if(GigaTester_modal.configs.main_button_top && GigaTester_modal.configs.main_button_top !== '') {
                                popup_dialog[0].style.top = `${btnHeight}px`;
                            }
                            if(GigaTester_modal.configs.main_button_bottom && GigaTester_modal.configs.main_button_bottom !== '') {
                                popup_dialog[0].style.top = '-175px';
                            }
                            if(GigaTester_modal.configs.main_button_rotation && GigaTester_modal.configs.main_button_rotation !== ''
                            && GigaTester_modal.configs.main_button_rotation !== '0') {
                                popup_dialog[0].style.bottom = '-114px';
                            }
                        }
                        popup_dialog.appendTo(button[0]);
                    }
                    if (GigaTester_modal.configs.cuvoTypes.length === 1) {
                        if (GigaTester_modal.configs.cuvoTypes[0] === 'BUGS') {
                            // GigaTester_modal.form_type = "BUGS";
                            window.GigaTester.open("BUGS");
                            popup_dialog.remove();
                        } else if (GigaTester_modal.configs.cuvoTypes[0] === 'FEEDBACK') {
                            // GigaTester_modal.form_type = "FEEDBACK";
                            window.GigaTester.open("FEEDBACK");
                            popup_dialog.remove();
                        } else if (GigaTester_modal.configs.cuvoTypes[0] === 'FEATURE_REQUEST') {
                            GigaTester_modal.form_type = "FEATURE_REQUEST";
                            window.GigaTester.open("FEATURE_REQUEST");
                            popup_dialog.remove();
                        }
                    } else {
                        if (GigaTester_modal.configs.isRemote) {
                            pop_up_title.appendTo(popup_dialog);
                        }

                        GigaTester_modal.configs.cuvoTypes.forEach(function (type) {
                            if (type === 'BUGS') {
                                let popup_bug_icon = $('<popupbtn><gtdiv>' + GigaTester_modal.configs.bugs_icon + '<span>' + GigaTester_modal.configs.bugs_title + '</span></gtdiv></popupbtn>');
                                let popup_bug_icon_tooltip = $('<popuptooltip></popuptooltip').html(GigaTester_modal.configs.bugs_tooltip_msg);
                                if (currentPosition === 'LEFT_MIDDLE' || currentPosition === 'LEFT_BOTTOM' || currentPosition === 'BOTTOM_LEFT') {
                                    popup_bug_icon_tooltip[0].style.right = '-136px';
                                    if (GigaTester_modal.configs.isSafari) {
                                        popup_bug_icon_tooltip[0].style.marginTop = '-80px';
                                        popup_bug_icon_tooltip[0].style.right = '-180px';
                                    }
                                } else if (currentPosition === 'CUSTOM') {
                                    popup_bug_icon[0].style.textAlign = 'center';
                                    popup_bug_icon_tooltip[0].style.left = '-106px';
                                } else {
                                    popup_bug_icon_tooltip[0].style.left = '170px';
                                    if (GigaTester_modal.configs.isSafari) {
                                        popup_bug_icon_tooltip[0].style.marginTop = '-80px';
                                    }
                                }
                                popup_bug_icon.appendTo(popup_dialog);
                                popup_bug_icon_tooltip.appendTo(popup_bug_icon);
                                popup_bug_icon.on("click", function (e) {
                                    // GigaTester_modal.form_type = "BUGS";
                                    window.GigaTester.open("BUGS");
                                    popup_dialog.remove();
                                    e.stopPropagation();
                                    e.preventDefault();
                                })
                            } else if (type === 'FEEDBACK') {
                                let popup_feedback_icon = $('<popupbtn><gtdiv>' + GigaTester_modal.configs.feedback_icon + '<span>' + GigaTester_modal.configs.feedback_title + '</span></gtdiv></popupbtn>');
                                let popup_feedback_icon_tooltip = $('<popuptooltip></popuptooltip').html(GigaTester_modal.configs.feedback_tooltip_msg);
                                if (currentPosition === 'LEFT_MIDDLE' || currentPosition === 'LEFT_BOTTOM'|| currentPosition === 'BOTTOM_LEFT') {
                                    popup_feedback_icon_tooltip[0].style.right = '-136px';
                                    if (GigaTester_modal.configs.isSafari) {
                                        popup_feedback_icon_tooltip[0].style.marginTop = '-80px';
                                        popup_feedback_icon_tooltip[0].style.right = '-180px';
                                    }
                                } else if (currentPosition === 'CUSTOM') {
                                    popup_feedback_icon[0].style.textAlign = 'center';
                                    popup_feedback_icon_tooltip[0].style.left = '-106px';
                                } else {
                                    popup_feedback_icon_tooltip[0].style.left = '170px';
                                    if (GigaTester_modal.configs.isSafari) {
                                        popup_feedback_icon_tooltip[0].style.marginTop = '-80px';
                                    }
                                }
                                popup_feedback_icon.appendTo(popup_dialog);
                                popup_feedback_icon_tooltip.appendTo(popup_feedback_icon);
                                popup_feedback_icon.on("click", function(e){
                                    // GigaTester_modal.form_type = "FEEDBACK";
                                    window.GigaTester.open("FEEDBACK");
                                    popup_dialog.remove();
                                    e.stopPropagation();
                                    e.preventDefault();
                                })
                            } else if (type === 'FEATURE_REQUEST') {
                                let popup_feature_icon = $('<popupbtn><gtdiv>' + GigaTester_modal.configs.feature_req_icon + GigaTester_modal.configs.request_feature_title + '</gtdiv></popupbtn>');
                                let popup_feature_icon_tooltip = $('<popuptooltip></popuptooltip').html(GigaTester_modal.configs.feature_tooltip_msg);
                                if (currentPosition === 'LEFT_MIDDLE' || currentPosition === 'LEFT_BOTTOM'|| currentPosition === 'BOTTOM_LEFT') {
                                    popup_feature_icon_tooltip[0].style.right = '-136px';
                                    popup_feature_icon_tooltip[0].style.fontFamily = 'Open Sans,sans-serif';
                                    if (GigaTester_modal.configs.isSafari) {
                                        popup_feature_icon_tooltip[0].style.marginTop = '-80px';
                                        popup_feature_icon_tooltip[0].style.right = '-180px';
                                    }
                                } else if (currentPosition === 'CUSTOM') {
                                    popup_feature_icon[0].style.textAlign = 'center';
                                    popup_feature_icon_tooltip[0].style.left = '-106px';
                                } else {
                                    popup_feature_icon_tooltip[0].style.left = '-136px';
                                    popup_feature_icon_tooltip[0].style.fontFamily = 'Open Sans,sans-serif';
                                    if (GigaTester_modal.configs.isSafari) {
                                        popup_feature_icon_tooltip[0].style.marginTop = '-80px';
                                    }
                                }
                                popup_feature_icon.appendTo(popup_dialog);
                                popup_feature_icon_tooltip.appendTo(popup_feature_icon);
                                // push popout options container a bit further into view
                                popup_dialog[0].style.bottom = '-160px';
                                popup_feature_icon.on("click", function(e){
                                    GigaTester_modal.form_type = "FEATURE_REQ";
                                    window.GigaTester.open("FEATURE_REQ");
                                    popup_dialog.remove();
                                    e.stopPropagation();
                                    e.preventDefault();
                                })
                            }
                        })

                        popup_dialog_close.appendTo(popup_dialog);
                        popup_dialog_close.on("click", function(e) {
                            popup_dialog.remove();
                            e.stopPropagation();
                            e.preventDefault();
                        })
                    }
                },
                hideControls: function() {
                    this.custom_ui.button.hide();
                    this.custom_ui.element.removeAttr("isopen");
                    this.custom_ui.element.css("display", "none");
                },
                showControls: function (force_show_form) {
                    if (!this.autoHide() && !this.configs.isRemote) {
                        this.custom_ui.button.show()
                    }
                    this.setDialogForm();
                    this.custom_ui.events.find('.gigatester-ctrl-item-step').show();
                    if (force_show_form) {
                        this.custom_ui.events.find(".gigatester-ctrl-item-form").show()
                    }
                    this.custom_ui.events.show();
                    this.focusControls();
                    if(!GigaTester_modal.configs.isRemote) {
                        this.custom_ui.button.hide();
                    }
                    this.custom_ui.element.css("display", "");
                    this.custom_ui.element.attr("isopen", "true")
                },
                openControls: function () {
                    console.log("GigaTester: openControls  called");
                    this.addControls();
                    if ($(document.getElementsByClassName("gigatester-popup-dialog"))) {
                        $(document.getElementsByClassName("gigatester-popup-dialog")).remove();
                    }
                    if ($(document.getElementsByClassName("gigatester-popup-dialog-remote"))) {
                        $(document.getElementsByClassName("gigatester-popup-dialog-remote")).remove();
                    }
                    if(GigaTester_modal.save_form_state) {
                        if($(document.getElementsByClassName('gigatester-ctrl-item'))){
                            $(document.getElementsByClassName('gigatester-ctrl-item')).show();
                        }
                    }
                    let open_tool = false;
                    this.controls_step = 2;
                    if (!open_tool) {
                        this.custom_ui.element.attr("isopen", "true")
                    }
                },
                focusControls: function(e) {
                    this.custom_ui.events.find('input[type="text"],input[type="email"],textarea').filter(":visible").each(function() {
                        if ($(this).val() === "") {
                            $(this).focus();
                            return false
                        }
                    })
                },
                changeCategory: function(e) {
                    this.categories = this.custom_ui.events.find('select[name="category"]').val()
                },
                changeSeverity: function(e) {
                    this.severity = this.custom_ui.events.find('select[name="severity"]').val()
                },
                toggleCheckbox: function(e) {
                    if ($(e.currentTarget).attr("disabled")) {
                        return
                    }
                    let is_checked = this.custom_ui.events.find('.gigatester-checkbox-container input[type="checkbox"]').prop("checked");
                    if (is_checked) {
                        this.custom_ui.events.find('.gigatester-checkbox-container input[type="checkbox"]').prop("checked", false);
                        this.custom_ui.events.find(".gigatester-checkbox-container svg").hide()
                    } else {
                        this.custom_ui.events.find('.gigatester-checkbox-container input[type="checkbox"]').prop("checked", true);
                        this.custom_ui.events.find(".gigatester-checkbox-container svg").show()
                    }
                },
                selectAttachment: function(e) {
                    if ($(e.currentTarget).attr("disabled")) {
                        return
                    }
                    this.custom_ui.events.find(".gigatester-ctrl-item-attachment").click()
                },
                selectedRating: function(){
                    let form_settings = this.getFormSettings(this.form_type);
                    let rating = this.form_data.rating || 0;
                    // console.log('ratings', rating)
                    if (form_settings.rating_type) {
                        let selected_icon = this.custom_ui.events.find("gtrating > gtdiv:not(.inactive):last");
                        for(let i=0; i<rating; i++){
                        this.custom_ui.events.find("gtrating > gtdiv:not(.active):first").removeClass("inactive").addClass("active")
                        }
                        if (selected_icon.length) {
                            rating = selected_icon.data("rating")
                        }
                        this.form_data.rating = rating.slice(rating.length -1, rating.length)
                        console.log(GigaTester_modal.configs.rating_limit, 'form data')
                    }
                    if (this.form_data.rating <= GigaTester_modal.configs.rating_limit && GigaTester_modal.configs.rating_limit === 5) {
                        this.custom_ui.events.find(".gigatester-ctrl-item-form").show();
                    this.focusControls()
                    } else if (this.form_data.rating <= GigaTester_modal.configs.rating_limit && GigaTester_modal.configs.rating_limit !== 5) {
                        this.custom_ui.events.find(".gigatester-ctrl-item-form").show();
                        this.custom_ui.events.off("click", "gtrating > gtdiv");
                        this.custom_ui.events.off("mouseenter", "gtrating > gtdiv");
                        this.custom_ui.events.off("mouseleave", "gtrating > gtdiv");
                    }
                },
                selectRating: function(e) {
                    let form_settings = this.getFormSettings(this.form_type);
                    this.custom_ui.events.find("gtrating > gtdiv").addClass("inactive");
                    if (form_settings.rating_type === "EMOJI" || form_settings.rating_type === "THUMB") {
                        $(e.currentTarget).removeClass("inactive")
                    } else if (form_settings.rating_type === "STAR" || form_settings.rating_type === "HEART") {
                        $(e.currentTarget).prevAll().removeClass("inactive");
                        $(e.currentTarget).removeClass("inactive")
                    }
                    let rating = this.form_data.rating || "";
                    if (form_settings.rating_type) {
                        let selected_icon = this.custom_ui.events.find("gtrating > gtdiv:not(.inactive):last");
                        if (selected_icon.length) {
                            rating = selected_icon.data("rating")
                            console.log('GigaTester: ratings type ', rating)
                        }
                        this.form_data.rating = rating.slice(rating.length -1, rating.length)
                        // console.log('GigaTester : max commented rating limit', GigaTester_modal.configs.rating_limit)
                    }
                    if (this.form_data.rating <= GigaTester_modal.configs.rating_limit && GigaTester_modal.configs.rating_limit === 5) {
                        this.custom_ui.events.find(".gigatester-ctrl-item-form").show();
                    this.focusControls()
                    } else if (this.form_data.rating <= GigaTester_modal.configs.rating_limit && GigaTester_modal.configs.rating_limit !== 5) {
                        this.custom_ui.events.find(".gigatester-ctrl-item-form").show();
                        this.custom_ui.events.off("click", "gtrating > gtdiv");
                        this.custom_ui.events.off("mouseenter", "gtrating > gtdiv");
                        this.custom_ui.events.off("mouseleave", "gtrating > gtdiv");
                    } else{
                        this.post();
                    }
                },
                ratingPreview: function(e) {
                    let form_settings = this.getFormSettings(this.form_type);
                    if (form_settings.rating_type === "STAR" || form_settings.rating_type === "HEART") {
                        if (GigaTester_modal.configs.rating_limit !== 5) {
                            this.custom_ui.events.find("gtrating > gtdiv").removeClass("highlight").addClass("preview");
                        }
                        $(e.currentTarget).prevAll().addClass("highlight");
                        $(e.currentTarget).addClass("highlight")
                    } else if (form_settings.rating_type === "EMOJI" || form_settings.rating_type === "THUMB") {
                        this.custom_ui.events.find("gtrating > gtdiv").removeClass("highlight").addClass("preview");
                        $(e.currentTarget).addClass("highlight")
                    }
                },
                unRatingPreview: function (e) {
                    this.custom_ui.events.find("gtrating > gtdiv").removeClass("highlight preview")
                },
                uploadAttachment: function(e) {
                    // console.log(e.target, 'file upload')
                    if (!e.target.files || !e.target.files.length) {
                        return
                    }
                    GigaTester_modal.form_data.external_file = e.target.files[0];
                    let external_file = $('<div id="gigatester_external_file_preview">' + GigaTester_modal.form_data.external_file.name + '</div>').html(GigaTester_modal.form_data.external_file.fileName);
                    let external_file_close = $('<button id="gigatester_remove_attachment_btn">').html(GigaTester_Icons.trash_bin_icon);
                    $(document.getElementsByClassName('gigatester-ctrl-item-preview-placeholder')).css('border', 'none')
                    const size_limit = GigaTester_modal.configs.attachment_size || 1;
                    $(document.getElementsByClassName('gigatester-ctrl-item-preview-placeholder')).text("");
                    external_file.appendTo($(document.getElementsByClassName('gigatester-ctrl-item-preview-placeholder')));
                    external_file_close.insertAfter(external_file);
                    external_file_close.on("click", function() {
                        external_file.remove();
                        GigaTester_modal.form_data.external_file = '';
                        GigaTester_modal.recording = false;
                        GigaTester_modal.saveCheckedCategory();
                        external_file_close.remove();
                        GigaTester_modal.setDialogForm();
                        GigaTester_modal.saveSubCategory();
                        if(GigaTester_modal.form_data.rating){
                            GigaTester_modal.selectedRating();
                        }
                        })
                        if (GigaTester_modal.form_data.external_file.size > size_limit * 1024 * 1024) {
                            console.log("GigaTester: external_file_size = " + Math.ceil(GigaTester_modal.form_data.external_file.size / 1024 / 1024) + 'MB')
                            console.log("GigaTester: size_limit = " + size_limit + "MB")

                        }
                        this.custom_ui.events.find(".gigatester-ctrl-item-screenshot").attr('disabled', 'true');
                        this.custom_ui.events.find(".gigatester-ctrl-item-video").attr('disabled', 'true');
                        this.custom_ui.events.find(".gigatester-ctrl-item-audio").attr('disabled', 'true');
                        this.custom_ui.events.find(".gigatester-ctrl-item-add-attachment").attr('disabled', 'true');
                        this.custom_ui.events.find(".gigatester-ctrl-item-attach-actions").attr('disabled', 'true');
                },
                closeDialog: function(e) {
                    let _doClose = function() {
                        clearTimeout(this.close_timeout);
                        if(GigaTester_modal.confirmModal){
                            this.reset();
                        } else{
                            GigaTester_modal.showConfirmModal();
                        }
                    }.bind(this);
                    _doClose()
                },
                reset: function(e) {
                    if (e && e.type === "click") {
                        e.preventDefault()
                    }
                    if (!this.autoHide() && !GigaTester_modal.configs.isRemote) {
                        this.custom_ui.button.show()
                    }
                    this.custom_ui.element.removeAttr("isopen");
                    this.comments = [];
                    this.video_blob = null;
                    this.form_data.audio_file = '';
                    this.form_data.video_file='';
                    this.form_data.external_file='';
                    this.form_data.image_file='';
                    this.form_data = {
                        rating: "",
                        email: "",
                        description: "",
                        category: "",
                        severity: "",
                    };
                    this.recording = false;
                    this.canvas_mode = false;
                    this.removeGToverlay();
                    this.removeGTControls();
                    this.removeComments();
                    GigaTester_modal.save_form_state = false;
                    GigaTester_modal.set_screen_default_category = true;
                    this.form_data['category'] = GigaTester.category || "category";
                    GigaTester_modal.configs.selected_category = []
                    this.form_data['severity'] = "severity";
                    this.controls_step = 0
                },
                postMedia: function(fileSelected){
                    // console.log(fileSelected,'postMedia')
                    // console.log(fileSelected.name, 'name')
                    console.log('postMedia')
                    let formUpload = new FormData();
                    formUpload.append('file', fileSelected);
                    formUpload.append('fileName', fileSelected.name);
                    const reader = new FileReader();
                    // console.log(formUpload.entries(),'formuplod')
                    reader.onloadend = () => {
                        console.log('inside reader')
                        const dataInfo = {
                            fileType: fileSelected.type,
                            fileName: fileSelected.name,
                        };
                        this.postMediaContent(dataInfo, fileSelected);
                    }
                    reader.readAsDataURL(fileSelected);
                },
                validateFields: function(e) {
                    e.preventDefault();
                    let dataError = false;
                    // console.log(GigaTester_modal.form_type)
                    if(GigaTester_modal.form_data.audio_file || GigaTester_modal.form_data.external_file || GigaTester_modal.form_data.video_file || GigaTester_modal.form_data.image_file){
                        let size_limit = GigaTester_modal.configs.max_file_size;
                        const file = GigaTester_modal.form_data.audio_file || GigaTester_modal.form_data.external_file || GigaTester_modal.form_data.video_file || GigaTester_modal.form_data.image_file;
                        console.log('GigaTester: uploaded file size ', Math.ceil(file.size / 1024 / 1024) + 'MB')
                        if (file.size > size_limit * 1024 * 1024) {
                            console.log('GigaTester: Max upload file size ', size_limit + "MB")
                            dataError = true;
                            GigaTester_modal.setNotifyStatus(`${'Media size is greater than ' + GigaTester_modal.configs.max_file_size + 'MB, Kindly delete and retry again'}`)
                            setTimeout(()=> GigaTester_modal.clearNotifyStatus(), 4000);
                        }
                    }
                    if(GigaTester_modal.form_type === "BUGS") {
                        if(GigaTester_modal.form_settings_default['BUGS'].category_field_mandatory && (this.form_data['category'] === 'category' || this.form_data['category'] === '' || this.form_data['category'].length == 0)){
                            dataError = true;
                            GigaTester_modal.setNotifyStatus('Please select a category')
                            setTimeout(()=> GigaTester_modal.clearNotifyStatus(), 4000);
                        } else if(GigaTester_modal.form_settings_default['BUGS'].severity_field_mandatory && (this.form_data['severity'] === 'severity' || this.form_data['severity'] === '')){
                            dataError = true;
                            GigaTester_modal.setNotifyStatus('Please select bug severity')
                            setTimeout(()=> GigaTester_modal.clearNotifyStatus(), 4000);
                        }
                    } else if(GigaTester_modal.form_type === "FEEDBACK") {
                        if(GigaTester_modal.form_settings_default['FEEDBACK'].rating_mandatory && this.form_data.rating < 1){
                            dataError = true;
                            GigaTester_modal.setNotifyStatus('Please provide your rating')
                            setTimeout(()=> GigaTester_modal.clearNotifyStatus(), 4000);
                        } else if(GigaTester_modal.form_settings_default['FEEDBACK'].category_field_mandatory && (this.form_data['category'] === 'category' || this.form_data['category'] === '')){
                            dataError = true;
                            GigaTester_modal.setNotifyStatus('Please select a category')
                            setTimeout(()=> GigaTester_modal.clearNotifyStatus(), 4000);
                        }
                    }

                    if(!dataError) {
                        this.submitPost(e);
                    }
                },
                postMediaContent: function(dataInfo, fileSelected){
                    if($('gtdiv').hasClass('gigatester-ctrl-item-send-error')){
                        $(document.getElementsByClassName('gigatester-ctrl-item-send-error')).remove();
                        this.custom_ui.events.find(".gigatester-ctrl-item-send").attr("disabled", false);
                    }
                    let send_button = this.custom_ui.events.find(".gigatester-ctrl-item-send");
                    send_button.attr("disabled", true);
                    send_button.addClass("gigatester-ctrl-item-send-loading")
                    console.log(dataInfo, 'dataInfo');
                    fetch(`${GigaTester.endpoint}/feedbackMedia/`, {
                        method: 'POST',
                        body:  JSON.stringify(dataInfo),
                        headers: { 'Content-Type': 'application/json' },
                      })
                        .then(res => res.json())
                        .then(data => {
                          let xhr = new XMLHttpRequest();
                          console.log('Success:', data);
                          xhr.onreadystatechange = function() {
                            if (xhr.readyState === 4) {
                              if (xhr.status === 200) {
                                console.log("UPLOAD SUCCESSFUL");
                                $("<gtdiv>").addClass("gigatester-ctrl-item-send-msg").text(GigaTester_StringRes.get("media_upload_success") + " " + GigaTester_StringRes.get("submitting_feedback")).insertAfter(send_button);
                                // console.log('GigaTester: ', xhr.responseURL);
                                if(xhr.responseURL.includes('gt_image')){
                                    GigaTester_modal.form_data.image_file = xhr.responseURL.split('?')[0];
                                }
                                else if(xhr.responseURL.includes('gt_video')){
                                    GigaTester_modal.form_data.video_file = xhr.responseURL.split('?')[0]
                                }
                                else if(xhr.responseURL.includes('gt_audio')){
                                    GigaTester_modal.form_data.audio_file = xhr.responseURL.split('?')[0]
                                }
                                else{
                                    GigaTester_modal.form_data.external_file = xhr.responseURL.split('?')[0]
                                }
                                GigaTester_modal.post();
                              }
                            }
                            else {
                                console.log(xhr.status, 'GigaTester: Media post api error');
                                if (this.controls_step === 2) {
                                    send_button.removeClass("gigatester-ctrl-item-send-loading");
                                    send_button.removeClass("gigatester-ctrl-item-send-uploading");
                                    send_button.prop("disabled", false);
                                    send_button.attr("disabled", false);
                                    $("<gtdiv>").addClass("gigatester-ctrl-item-send-error").text(GigaTester_StringRes.get("upload_media_error")).insertAfter(send_button)
                                }
                            }
                          };
                          xhr.onerror = function(){
                              console.log(xhr.status)
                              if (this.controls_step === 2) {
                                send_button.removeClass("gigatester-ctrl-item-send-loading");
                                send_button.removeClass("gigatester-ctrl-item-send-uploading");
                                send_button.prop("disabled", false);
                                send_button.attr("disabled", false);
                                $("<gtdiv>").addClass("gigatester-ctrl-item-send-error").text(GigaTester_StringRes.get("upload_media_error")).insertAfter(send_button)
                            }
                          }
                          xhr.upload.addEventListener("progress", function(evt) {
                            if (evt.lengthComputable) {
                                send_button.removeClass("gigatester-ctrl-item-send-loading");
                                send_button.width(send_button.width());
                                let percent = parseInt(evt.loaded / evt.total * 100, 10);
                                // console.log(percent, evt)
                                send_button.find(".gigatester-ctrl-item-send-text").text(percent + "%");
                                send_button.find(".gigatester-ctrl-item-send-progress").width(percent + "%")
                            }
                        }, false)

                          xhr.open("PUT", data);
                          xhr.send(fileSelected);
                        })
                        .catch(error => {
                            console.log(error, 'post api error');
                            if (this.controls_step === 2) {
                                send_button.removeClass("gigatester-ctrl-item-send-loading");
                                send_button.removeClass("gigatester-ctrl-item-send-uploading");
                                send_button.prop("disabled", false);
                                send_button.attr("disabled", false);
                                $("<gtdiv>").addClass("gigatester-ctrl-item-send-error").text(GigaTester_StringRes.get("upload_media_error")).insertAfter(send_button)
                            }
                        })
                },
                post: function(){
                    let send_button = this.custom_ui.events.find(".gigatester-ctrl-item-send");
                    send_button.addClass("gigatester-ctrl-item-send-loading")
                    $(document.getElementById('gigatester-loader')).addClass("gigatester-ctrl-item-loader")

                    let finalRating = 0;
                    let feedbackType = '';
//                    let completedMessage = '';
                    let form_settings = this.getFormSettings(this.form_type);
                    if(this.form_type === 'FEEDBACK') {
                        finalRating = parseInt(this.form_data.rating);
                        feedbackType = 'FEEDBACK'
//                        completedMessage = GigaTester_modal.form_settings_default['FEEDBACK'].completed_dialog_paragraph
                    } else {
                        finalRating = 0;
                        feedbackType = 'BUG_REPORT'
//                        completedMessage = GigaTester_modal.form_settings_default['BUGS'].completed_dialog_paragraph
                    }

                    let allComments = {
                        generalComment: this.form_data['description'],
                        standardFeedback: []
                    };
                    $.each(this.comments, function(key, comment) {
                        allComments[key] = comment.getGigaData();
                    });
                    $('.gigatester-reason-checkboxes:checked').each(function () {
                        allComments.standardFeedback.push($(this).next("label").text());
                    });
                    // console.log(allComments, 'GigaTester: all comments:');

                    if(this.form_data['category'] === "category"){
                        this.form_data['category'] = ''
                    }
                    if(this.form_data['severity'] === "severity"/* || this.form_data['severity'] === ""*/){
                        this.form_data['severity'] = '';//'unknown'
                    }
                    console.log(GigaTester.email)
                    const postData = {
                        productRating: finalRating,
                        userName: this.custom_ui.events.find('input[name="email"]').val() || GigaTester.email,
                        feedbackType: feedbackType,
                        feedbackCategory: this.form_data['category'],
                        bugPriority: this.form_data['severity'],
                        productVersion: GigaTester.productVersion,
                        platformName: GigaTester_modal.configs.capture_system_details ? platform.name : '',
                        platformVersion: GigaTester_modal.configs.capture_system_details ? platform.version : '',
                        platformOs: GigaTester_modal.configs.capture_system_details ? platform.os : '',
                        pageURL: GigaTester_modal.configs.capture_system_details ? window.location : '',
//                        title: GigaTester_modal.configs.title,
//                        thanksMsg: completedMessage,
                        // //more like this: platform.layout, platform.manafacturer, platform.product, platform.prerelease, platform.ua(user agent),
                        // window.devicePixelRatio, window.screen.width, window.screen.height, window.orientation,
                        feedbackMedia: {
                          image: GigaTester_modal.form_data.image_file || '',
                          video: GigaTester_modal.form_data.video_file || '',
                          file: GigaTester_modal.form_data.external_file || '',
                          audio: GigaTester_modal.form_data.audio_file || '',
                        },
                        feedbackComments: allComments,
                        productKey: GigaTester.apiKey,
                        userDetails: GigaTester.userDetails || GigaTester_modal.user_detail,
                        contextDetails: GigaTester.contextDetails || GigaTester_modal.context_detail,
                      }
                    // console.log(postData, 'GigaTester: post Data:')

                      fetch(`${GigaTester.endpoint}/feedback/`, {
                        method: 'POST',
                        body: JSON.stringify(postData),
                        headers: { 'Content-Type': 'application/json'},
                      })
                          .then(res => res.json())
                          .then(data => {
                            console.log(data)
                            GigaTester_modal.confirmModal = true;
                            let success_icon = $('<gtdiv class="gigatester-ctrl-item-send-success">').html('<gtdiv>' + "<gtspan>" + GigaTester_StringUtils.escapeSpecialChars(form_settings.completed_dialog_headline) + "</gtspan>" + "<p>" + GigaTester_StringUtils.escapeSpecialChars(form_settings.completed_dialog_paragraph, true) + "</p>" + "</gtdiv>" + (this.configs.display_powered_by ? "<gtfooter>" + "<span>Powered by</span>" + "<span>" + " Cuvo" + "</span>"  + "</gtfooter>" : ""));
                            this.custom_ui.events.append(success_icon);
                            this.controls_step = 3;
                            send_button.find(".gigatester-ctrl-item-send-text").text(GigaTester_StringRes.get("send"));
                            send_button.removeClass("gigatester-ctrl-item-send-loading");
                            this.recording = false;
                            $(document.getElementsByClassName('gigatester-dialog-scroll')).css('display', 'none');
                            let close_icon = $(document.getElementsByClassName('gigatester-ctrl-item-close'));
                            // $(document.getElementsByClassName('gigatester-ctrl-item-r')).css('width','355px');
                            setTimeout(function () {
                                $(document.getElementsByClassName('gigatester-dialog-scroll')).css('display', 'block');
                                $(document.getElementById('gigatester-loader')).removeClass("gigatester-ctrl-item-loader")
                                close_icon.trigger("click")
                            }, 3000);
                        })
                        .catch(error => {
                            console.log(error, 'post api error');
                            if (this.controls_step === 2) {
                                send_button.removeClass("gigatester-ctrl-item-send-loading");
                                send_button.removeClass("gigatester-ctrl-item-send-uploading");
                                send_button.prop("disabled", false);
                                send_button.attr("disabled", false);
                                $("<gtdiv>").addClass("gigatester-ctrl-item-send-error").text(GigaTester_StringRes.get("form_submit_error")).insertAfter(send_button);
                            } else if (this.controls_step === 3) {
                                $("<gtdiv>").addClass("gigatester-ctrl-item-send-msg").text(GigaTester_StringRes.get("form_submit_error")).appendTo($('.gigatester-ctrl-item-send-success'));
                            }
                        })
                },
                submitPost: function(e){
                    e.preventDefault();
                    // console.log('submit post')
                    if(GigaTester_modal.form_data.video_file){
                        GigaTester_modal.postMedia(GigaTester_modal.form_data.video_file);
                    }
                    else if(GigaTester_modal.form_data.audio_file){
                        GigaTester_modal.postMedia(GigaTester_modal.form_data.audio_file)
                    }
                    else if(GigaTester_modal.form_data.image_file){
                        GigaTester_modal.postMedia(GigaTester_modal.form_data.image_file)
                    }
                    else if(GigaTester_modal.form_data.external_file){
                        GigaTester_modal.postMedia(GigaTester_modal.form_data.external_file)
                    }
                    else{
                        GigaTester_modal.post()
                    }
                },
                closeEmptyCanvasComment: function() {
                    if (this.comments.length && this.comments[this.comments.length - 1].isEmpty()) {
                        this.comments[this.comments.length - 1].destroy();
                        this.comments.splice(this.comments.length - 1, 1)
                    }
                },
                canvasCommentStart: function(e) {
                    let pin_x, pin_y;
                    if (e.changedTouches && e.changedTouches.length) {
                        pin_x = e.changedTouches[0].offsetX;
                        pin_y = e.changedTouches[0].offsetX;
                    } else {
                        pin_x = e.offsetX;
                        pin_y = e.offsetY;
                    }
                    if (this.comments.length && this.comments[this.comments.length - 1].isOpen()) {
                        this.comments[this.comments.length - 1].saveCanvasComments();
                        $.each(this.comments, function(index, comment) {
                            comment.hideForm()
                        });
                        this.addCanvasComment(pin_x, pin_y);
                        GigaTester_modal.scrollDisable();
                    } else {
                        $.each(this.comments, function(index, comment) {
                            comment.hideForm()
                        });
                        this.addCanvasComment(pin_x, pin_y);
                        GigaTester_modal.scrollDisable();
                    }
                },
            }

        let GigaTester_Api = {
            isLoaded: function() {
                console.log('GigaTester: gigatester isLoaded check');
                if(GigaTester_modal.config_loaded) {
                    console.log('GigaTester: config already loaded');
                    return true;
                }
                if(!GigaTester.endpoint || GigaTester.endpoint.length < 1 ) {
                    console.log('GigaTester: loading failed: endpoint not set');
                    GigaTester_modal.config_loaded = false;
                    return false;
                } else if(!GigaTester.apiKey || GigaTester.apiKey.length < 1 ) {
                    console.log('GigaTester: loading failed: apiKey not set');
                    GigaTester_modal.config_loaded = false;
                    return false;
                } else if(!GigaTester.productVersion || GigaTester.productVersion.length < 1 ) {
                    console.log('GigaTester: loading failed: productVersion not set');
                    GigaTester_modal.config_loaded = false;
                    return false;
                } else {
                    // check browser for safari regardless of fetch call
                    // const checkSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
                    //     navigator.userAgent &&
                    //     navigator.userAgent.indexOf('CriOS') == -1 &&
                    //     navigator.userAgent.indexOf('FxiOS') == -1;
                    // GigaTester_modal.configs.isSafari = checkSafari;

                    console.log('GigaTester: fetching configuration');
                    fetch(`${GigaTester.endpoint}/feedbackConfig?apiKey=${GigaTester.apiKey}&version=${GigaTester.productVersion}`, {
                        method: 'GET',
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log('GigaTester: api data ', data);
                        GigaTester_modal.configs.categories = [];
                        GigaTester_modal.configs.severities = [];
                        GigaTester_modal.configs.workflow_type = "";
                        GigaTester_modal.configs.config_data = data;

                        if (data[0].feedbackTypes.length > 0) {
                            GigaTester_modal.configs.cuvoTypes = data[0].feedbackTypes;
                        }
                        if(data[0].feedbackSettings) {
                            if(data[0].feedbackSettings.ratingLimit) {
                                GigaTester_modal.configs.rating_limit = data[0].feedbackSettings.ratingLimit;
                            }
                            if(data[0].feedbackSettings.ratingIcon) {
                                GigaTester_modal.form_settings_default['FEEDBACK'].rating_type = data[0].feedbackSettings.ratingIcon;
                            }
                            if(data[0].feedbackSettings.icon && data[0].feedbackSettings.icon.trim().length > 0) {
                                GigaTester_modal.configs.feedback_icon = data[0].feedbackSettings.icon.trim();
                            }
                            if(data[0].feedbackSettings.title && data[0].feedbackSettings.title.trim().length > 0) {
                                GigaTester_modal.configs.feedback_title = data[0].feedbackSettings.title.trim();
                            }
                            if (data[0].feedbackSettings.tooltip && data[0].feedbackSettings.tooltip.trim().length > 0) {
                                GigaTester_modal.configs.feedback_tooltip_msg = data[0].feedbackSettings.tooltip.trim();
                            }
                            if(data[0].feedbackSettings.dialogMsg && data[0].feedbackSettings.dialogMsg.trim().length > 0) {
                                GigaTester_modal.form_settings_default['FEEDBACK'].rating_title_message = data[0].feedbackSettings.dialogMsg.trim();
                            }
                            if (data[0].feedbackSettings.thanksMsg && data[0].feedbackSettings.thanksMsg.trim().length > 0) {
                                GigaTester_modal.form_settings_default['FEEDBACK'].completed_dialog_paragraph = data[0].feedbackSettings.thanksMsg.trim();
                            }
                            if(data[0].feedbackSettings.reqComments != undefined && data[0].feedbackSettings.reqComments === false) {
                                GigaTester_modal.form_settings_default['FEEDBACK'].comment_field_mandatory = false;
                            }
                            if(data[0].feedbackSettings.reqDisplayEmail != undefined && data[0].feedbackSettings.reqDisplayEmail === true) {
                                GigaTester_modal.form_settings_default['FEEDBACK'].hide_email = false;
                            }
                        }
                        if(data[0].bugSettings) {
                            if(data[0].bugSettings.icon && data[0].bugSettings.icon.trim().length > 0) {
                                GigaTester_modal.configs.bugs_icon = data[0].bugSettings.icon.trim();
                            }
                            if(data[0].bugSettings.title && data[0].bugSettings.title.trim().length > 0) {
                                GigaTester_modal.configs.bugs_title = data[0].bugSettings.title.trim();
                            }
                            if (data[0].bugSettings.tooltip && data[0].bugSettings.tooltip.trim().length > 0) {
                                GigaTester_modal.configs.bugs_tooltip_msg = data[0].bugSettings.tooltip.trim();
                            }
                            if(data[0].bugSettings.dialogMsg && data[0].bugSettings.dialogMsg.trim().length > 0) {
                                GigaTester_modal.form_settings_default['BUGS'].bug_title_message = data[0].bugSettings.dialogMsg.trim();
                            }
                            if (data[0].bugSettings.thanksMsg && data[0].bugSettings.thanksMsg.trim().length > 0) {
                                GigaTester_modal.form_settings_default['BUGS'].completed_dialog_paragraph = data[0].bugSettings.thanksMsg.trim();
                            }
                            if (data[0].bugSettings.reqComments != undefined && data[0].bugSettings.reqComments === false) {
                                GigaTester_modal.form_settings_default['BUGS'].comment_field_mandatory = false;
                            }
                            if(data[0].bugSettings.showSeverity != undefined && data[0].bugSettings.showSeverity === false) {
                                GigaTester_modal.form_settings_default['BUGS'].display_severity = false;
                                GigaTester_modal.form_settings_default['BUGS'].severity_field_mandatory = false;
                            }
                            if(data[0].bugSettings.reqDisplayEmail != undefined && data[0].bugSettings.reqDisplayEmail === true) {
                                GigaTester_modal.form_settings_default['BUGS'].hide_email = false;
                            }
                        }
                        if (data[0].featureReqSettings) {
                            if(data[0].featureReqSettings.icon && data[0].featureReqSettings.icon.trim().length > 0) {
                                GigaTester_modal.configs.feature_req_icon = data[0].featureReqSettings.icon.trim();
                            }
                            if(data[0].featureReqSettings.title && data[0].featureReqSettings.title.trim().length > 0) {
                                GigaTester_modal.configs.request_feature_title = data[0].featureReqSettings.title.trim();
                            }
                            if (data[0].featureReqSettings.tooltip && data[0].featureReqSettings.tooltip.trim().length > 0) {
                                GigaTester_modal.configs.feature_tooltip_msg = data[0].featureReqSettings.tooltip.trim();
                            }
                            if(data[0].featureReqSettings.dialogMsg && data[0].featureReqSettings.dialogMsg.trim().length > 0) {
                                GigaTester_modal.form_settings_default['FEATURE_REQ'].reqFeature_title_msg = data[0].featureReqSettings.dialogMsg.trim();
                            }
                            if (data[0].featureReqSettings.thanksMsg && data[0].featureReqSettings.thanksMsg.trim().length > 0) {
                                GigaTester_modal.form_settings_default['FEATURE_REQ'].completed_dialog_paragraph = data[0].featureReqSettings.thanksMsg.trim();
                            }
                            if (data[0].featureReqSettings.reqComments != undefined && data[0].featureReqSettings.reqComments === false) {
                                GigaTester_modal.form_settings_default['FEATURE_REQ'].comment_field_mandatory = false;
                            }
                            if(data[0].featureReqSettings.showSeverity != undefined && data[0].featureReqSettings.showSeverity === false) {
                                GigaTester_modal.form_settings_default['FEATURE_REQ'].display_severity = false;
                                GigaTester_modal.form_settings_default['FEATURE_REQ'].severity_field_mandatory = false;
                            }
                            if(data[0].featureReqSettings.reqDisplayEmail != undefined && data[0].featureReqSettings.reqDisplayEmail === true) {
                                GigaTester_modal.form_settings_default['FEATURE_REQ'].hide_email = false;
                            }
                        }
                        if(data[0].widgetLookAndFeel) {
                            if(data[0].widgetLookAndFeel.bgColor) {
                                GigaTester_modal.configs.main_button_background_color = data[0].widgetLookAndFeel.bgColor;
                            }
                            if(data[0].widgetLookAndFeel.fgColor) {
                                GigaTester_modal.configs.main_button_text_color = data[0].widgetLookAndFeel.fgColor;
                            }
                            if(data[0].widgetLookAndFeel.text && data[0].widgetLookAndFeel.text.trim().length > 0) {
                                GigaTester_modal.configs.main_button_text = data[0].widgetLookAndFeel.text.trim();
                            }
                            if(data[0].widgetLookAndFeel.font) {
                                GigaTester_modal.configs.main_button_font = data[0].widgetLookAndFeel.font;
                            }
                            if (data[0].widgetLookAndFeel.fontWeight) {
                                GigaTester_modal.configs.main_button_fontWeight = data[0].widgetLookAndFeel.fontWeight;
                            }
                            if (data[0].widgetLookAndFeel.rotation) {
                                GigaTester_modal.configs.main_button_rotation = data[0].widgetLookAndFeel.rotation;
                            }
                            if (data[0].widgetLookAndFeel.position) {
                                if (data[0].widgetLookAndFeel.position === "RIGHT_MIDDLE") {
                                    GigaTester_modal.configs.main_button_position = data[0].widgetLookAndFeel.position;
                                    GigaTester_modal.configs.main_button_rotation = '90';
                                } else if (data[0].widgetLookAndFeel.position === "RIGHT_BOTTOM") {
                                    GigaTester_modal.configs.main_button_position = data[0].widgetLookAndFeel.position;
                                    GigaTester_modal.configs.main_button_rotation = '90';
                                } else if (data[0].widgetLookAndFeel.position === "LEFT_MIDDLE") {
                                    GigaTester_modal.configs.main_button_position = data[0].widgetLookAndFeel.position;
                                    GigaTester_modal.configs.main_button_rotation = '270';
                                } else if (data[0].widgetLookAndFeel.position === "LEFT_BOTTOM") {
                                    GigaTester_modal.configs.main_button_position = data[0].widgetLookAndFeel.position;
                                    GigaTester_modal.configs.main_button_rotation = '270';
                                } else if (data[0].widgetLookAndFeel.position === "BOTTOM_LEFT") {
                                    GigaTester_modal.configs.main_button_position = data[0].widgetLookAndFeel.position;
                                    GigaTester_modal.configs.main_button_rotation = '0';
                                } else if (data[0].widgetLookAndFeel.position === "BOTTOM_RIGHT") {
                                    GigaTester_modal.configs.main_button_position = data[0].widgetLookAndFeel.position;
                                    GigaTester_modal.configs.main_button_rotation = '0';
                                } else if (data[0].widgetLookAndFeel.position === "CUSTOM") {
                                    GigaTester_modal.configs.main_button_position = data[0].widgetLookAndFeel.position;
                                    GigaTester_modal.configs.main_button_top = data[0].widgetLookAndFeel.custom.top;
                                    GigaTester_modal.configs.main_button_bottom = data[0].widgetLookAndFeel.custom.bottom;
                                    GigaTester_modal.configs.main_button_left = data[0].widgetLookAndFeel.custom.left;
                                    GigaTester_modal.configs.main_button_right = data[0].widgetLookAndFeel.custom.right;
                                    GigaTester_modal.configs.main_button_rotation = data[0].widgetLookAndFeel.custom.rotation;
                                    GigaTester_modal.configs.main_button_borderRadius = data[0].widgetLookAndFeel.custom.borderRadius;
                                    GigaTester_modal.configs.main_button_margin = data[0].widgetLookAndFeel.custom.margin;
                                    GigaTester_modal.configs.main_button_padding = data[0].widgetLookAndFeel.custom.padding;
                                }
                            }
                            if(data[0].widgetLookAndFeel.icon && data[0].widgetLookAndFeel.icon.trim().length > 0) {
                                GigaTester_modal.configs.main_button_icon = data[0].widgetLookAndFeel.icon.trim();
                            }
                        }
                        if(data[0].title && data[0].title.trim().length > 0) {
                            GigaTester_modal.configs.title = data[0].title.trim();
                        }
                        if(data[0].videoAudioMaxDuration && data[0].videoAudioMaxDuration > 0) {
                            GigaTester_modal.configs.screen_record_time = data[0].videoAudioMaxDuration * 60;
                            GigaTester_modal.configs.audio_time = data[0].videoAudioMaxDuration * 60;
                        }
                        if(data[0].uploadFileMaxSize && data[0].uploadFileMaxSize > 0) {
                            GigaTester_modal.configs.max_file_size = data[0].uploadFileMaxSize;
                        }
                        if(data[0].requireEmail != undefined && data[0].requireEmail === false) {
                            GigaTester_modal.form_settings_default['FEEDBACK'].email_field_mandatory = false
                            GigaTester_modal.form_settings_default['BUGS'].email_field_mandatory = false
                        }
                        if(data[0].thanksStr && data[0].thanksStr.trim().length > 0) {
                            GigaTester_modal.form_settings_default['FEEDBACK'].completed_dialog_headline = data[0].thanksStr.trim();
                            GigaTester_modal.form_settings_default['BUGS'].completed_dialog_headline = data[0].thanksStr.trim();
                        }
                        if(data[0].captureSystemDetails != undefined && data[0].captureSystemDetails === false) {
                            GigaTester_modal.configs.capture_system_details = false;
                        }
                        if(data[0].invokeOn[0] === "AFTER_DELAY"){
                            const delay = (data[0].invokeDelay && data[0].invokeDelay > 0) ? data[0].invokeDelay * 60 * 1000 : 120000;
                            setTimeout(() => {
                                GigaTester_modal.popOutDialog();
                            }, delay);
                        }
                        console.log('data[0].remoteBtns', data[0].remoteBtns);
                        if(data[0].remoteBtns && data[0].remoteBtns.length > 0) {
                            GigaTester_modal.configs.remoteBtns = [];
                            for(let remoteBtn of data[0].remoteBtns) {
                                console.log('remoteBtn', remoteBtn);
                                if(remoteBtn.enabled) {
                                    GigaTester_modal.configs.isRemote = true;
                                    GigaTester.hidden = true;
                                    if(remoteBtn.btnId && remoteBtn.btnId.trim().length > 0) {
                                        GigaTester_modal.configs.remoteBtns.push(remoteBtn.btnId.trim());
                                        $(document.getElementById(remoteBtn.btnId.trim())).css("display", "");
                                    }
                                } else {
                                    if(remoteBtn.btnId && remoteBtn.btnId.trim().length > 0) {
                                        $(document.getElementById(remoteBtn.btnId.trim())).css("display", "none");
                                    }
                                }
                            }
                        }
                        if(GigaTester_modal.form_type === "BUGS" && data[0].bugSettings && data[0].bugSettings.categories){
                            let category = data[0].bugSettings.categories;
                            category.map(item => {
                                if(item.name && (item.name.trim().length > 0)) {
                                    GigaTester_modal.configs.categories.push(item.name.trim())
                                }
                            })
                        }
                        else if(GigaTester_modal.form_type === "FEEDBACK" && data[0].feedbackSettings && data[0].feedbackSettings.categories){
                            let category = data[0].feedbackSettings.categories;
                            category.map(item => {
                                if(item.name && (item.name.trim().length > 0)) {
                                    GigaTester_modal.configs.categories.push(item.name.trim());
                                }
                            })
                        }
                        if(data[0].bugSettings && data[0].bugSettings.severities){
                            data[0].bugSettings.severities.map(item => {
                                if(item.trim().length > 0) {
                                    GigaTester_modal.configs.severities.push(item.trim());
                                }
                            })
                        }
                        GigaTester_modal.config_loaded = true;
                        GigaTester_modal.addFeedbackButton();
                        GigaTester_modal.checkSelectDependancyload();

                        if(GigaTester.hidden) {
                            console.log('GigaTester: starting in hidden mode');
                            GigaTester.hide();
                        } else {
                            console.log('GigaTester: starting in visible mode');
                        }
                        GigaTester.ready = true;
                    })
                    .catch(function(err) {
                        console.log(err , 'err')
                        console.log('GigaTester: Failed to load config from server');
                        GigaTester_modal.config_loaded = false;
                        return false;
                    })
                    return true;
                }
            },
            start: function() {
                console.log('GigaTester: start called');
                GigaTester_modal.config_loaded = false;
                GigaTester.ready = false;
                GigaTester_modal.init.call(GigaTester_modal);
                console.log('GigaTester: js api');
            },
            destroy: function() {
                console.log('GigaTester: destroy called');
                if (GigaTester_modal.custom_ui && GigaTester_modal.custom_ui.element) {
                    GigaTester_modal.custom_ui.element.remove();
                }
                GigaTester.Event_Recorder.stop();
                GigaTester.Console_Recorder.stop();
                $("link.gigatester-css").remove();
                $("script#gigatester-sdk").remove();
                delete window.GigaTester
            },
            open: function(type) {
                console.log('GigaTester: open called with type:', type);
                GigaTester_modal.confirmModal = false;
                if(type) {
                    if((type === "BUGS") || (type === "FEEDBACK")) {
                        GigaTester_modal.custom_ui.element.css("display", "");
                        GigaTester_modal.form_type = type;
                        GigaTester_modal.openControls();
                    } else {
                        console.log('GigaTester: error in open: either call with no parameters or with parameter "BUGS" or "FEEDBACK"');
                    }
                } else {
                    if(GigaTester_modal.save_form_state){
                        console.log(GigaTester_modal.form_type);
                        GigaTester_modal.custom_ui.element.css("display", "");
                        GigaTester_modal.openControls();
                    }
                    else{
                        GigaTester_modal.configs.isRemote = true;
                        // GigaTester_modal.custom_ui.element.css("display", "");
                        GigaTester_modal.popOutDialog();
                    }
                }
            },
            close: function() {
                console.log('GigaTester: close called');
                GigaTester_modal.reset();
            },
            show: function() {
                console.log('GigaTester: show called');
                if(!GigaTester_modal.configs.isRemote) {
                    GigaTester.hidden = false;
                    GigaTester_modal.custom_ui.element.css("display", "");
                    GigaTester_modal.custom_ui.button.css("display", "");
                } else {
                    console.log('GigaTester: show: isRemote is true');
                }
            },
            hide: function () {
                console.log('GigaTester: hide called');
                GigaTester_modal.reset();
                GigaTester.hidden = true;
                GigaTester_modal.custom_ui.button.hide();
            },
            // useRemote: function (btnId, event) {
            //     console.log('GigaTester: useRemote called');
            //     GigaTester_modal.configs.isRemote = true;
            //     GigaTester_modal.custom_ui.element.css("display", "");
            //     GigaTester_modal.popOutDialog();
            // },
            //TODO: should eventually remove this function and use only the property
            setEmail: function(email) {
                console.log('GigaTester: setEmail called with email =', email);
                if (typeof email === "string") {
                    GigaTester_modal.form_data.email = $.trim(email);
                    GigaTester.email = $.trim(email);
                } else {
                    console.log('GigaTester: error setting email: value not a string');
                }
            },
            //TODO: should eventually remove this function and use only the property
            setUserDetails: function(userData){
                console.log('GigaTester: setUserDetails called with userData =', userData);
                if(typeof userData === "object"){
                    Object.entries(userData).forEach(([key, val]) => {
                        if(key.trim().toLowerCase() == "email"){
                            GigaTester.setEmail(val)
                        }
                        // console.log(key.trim().toLowerCase(), val);
                    });
                    GigaTester_modal.user_detail = userData;
                    GigaTester.userDetails = userData;
                    sessionStorage.setItem('gigatesterDefaultUserDetails', JSON.stringify(userData));
                } else {
                    console.log('GigaTester: error setting userDetails: value not a map');
                }
            },
            //TODO: should eventually remove this function and use only the property
            setContextDetails: function(contextData){
                console.log('GigaTester: setContextDetails called with contextData =', contextData);
                if(typeof contextData === "object") {
                    GigaTester_modal.context_detail = contextData;
                    GigaTester.contextDetails = contextData;
                    sessionStorage.setItem('gigatesterContextDetails', JSON.stringify(contextData));
                } else {
                    console.log('GigaTester: error setting contextDetails: value not a map');
                }
            },
            setDefaultCategory: function(category, params) {
                console.log('GigaTester: setDefaultCategory called with {category, params} =', {category: category, params: params});
                 if (typeof category === "string" && typeof params === "string") {
                    let defaultCategory = category.trim().toLowerCase();
                    console.log('GigaTester: defaultCategory ', defaultCategory)
                    console.log('GigaTester: params ', params.trim())
                    let set_default_category_flag = false;

                    if(params.trim().toUpperCase() === "BUGS" && GigaTester_modal.configs.config_data[0].bugSettings &&
                    GigaTester_modal.configs.config_data[0].bugSettings.categories) {
                        let numCat = GigaTester_modal.configs.config_data[0].bugSettings.categories.length;
                        for(let i = 0; i < numCat; i += 1) {
                            let value = GigaTester_modal.configs.config_data[0].bugSettings.categories[i];
                            if(value.name && (value.name.trim().length > 0) && (defaultCategory.length > 0) &&
                            (value.name.trim().toLowerCase() === defaultCategory)) {
                                set_default_category_flag = true;
                                console.log('GigaTester: category selected ' + JSON.stringify(value));
                                if(!GigaTester_modal.video_recording_mode){
                                    GigaTester_modal.configs.bugs_default_category = value.name;
                                    GigaTester_modal.form_data['category'] = value.name;
                                    GigaTester.category = value.name;
                                }
                                sessionStorage.setItem('gigatesterDefaultBugsCategory', value.name);
                            }
                        }
                    } else if(params.trim().toUpperCase() === "FEEDBACK" && GigaTester_modal.configs.config_data[0].feedbackSettings &&
                    GigaTester_modal.configs.config_data[0].feedbackSettings.categories) {
                        let numCat = GigaTester_modal.configs.config_data[0].feedbackSettings.categories.length;
                        for(let i = 0; i < numCat; i += 1) {
                            let value = GigaTester_modal.configs.config_data[0].feedbackSettings.categories[i];
                            if(value.name && (value.name.trim().length > 0) && (defaultCategory.length > 0) &&
                            (value.name.trim().toLowerCase() === defaultCategory)) {
                                set_default_category_flag = true;
                                console.log('GigaTester: category selected ' + value);
                                if(!GigaTester_modal.video_recording_mode){
                                    GigaTester_modal.configs.feedback_default_category = value.name;
                                    GigaTester_modal.form_data['category'] = value.name;
                                    GigaTester.category = value.name;
                                }
                                sessionStorage.setItem('gigatesterDefaultFeedbackCategory', value.name);
                            }
                        }
                    } else {
                        console.log('GigaTester: error setting default Category: value of second parameter should be either "BUGS" or "FEEDBACK"');
                    }

                    if(!set_default_category_flag){
                        console.log('GigaTester: warning setting default Category: category value not found in configured list. Defaulting to empty.');
                        GigaTester_modal.form_data['category'] = 'category';
                    }
                } else {
                    console.log('GigaTester: error setting default Category: value of either or both the parameters is not a string');
                }
            },
            isRemoteBtnEnabled: function(btnId) {
                if(btnId) {
                    if(GigaTester_modal.configs.remoteBtns.includes(btnId)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    console.log('GigaTester: error in open: expected button/link id as parameter');
                }
            },
            postFeedback: async function(feedbackData) {
                //This is the structure of the feedbackData
                // feedbackData: {
                //     feedbackType: string //'FEEDBACK' | 'BUGS'
                //     rating?: number
                //     comment?: string
                //     severity?: string
                //     email?: string
                //     userDetails?: {
                //       [key: string]: any
                //     }
                //     contextDetails?: {
                //       [key: string]: any
                //     }
                //     categoryComments?: {
                //       category: string
                //       comments?: string[]
                //     }
                //     platformName?: string
                //     platformVersion?: string
                //     platformOs?: any
                //     pageURL?: string
                //    }
                console.log('Gigatester: postFeedback called with feedbackData = ', feedbackData);
                if(typeof feedbackData === "object") {
                    //TODO: fill data to be posted from parameter
                    const postData = {
                        productRating: 0,
                        userName: GigaTester.email || '',
                        feedbackType: 'FEEDBACK',
                        feedbackCategory: GigaTester.category || '',
                        bugPriority: GigaTester.severity || '',
                        productVersion: GigaTester.productVersion,
                        platformName: '',
                        platformVersion: '',
                        platformOs: '',
                        pageURL: '',
                        feedbackMedia: { image: '', video: '', file: '', audio: '' },
                        feedbackComments: { generalComment : '', standardFeedback : [] },
                        productKey: GigaTester.apiKey,
                        userDetails: GigaTester.userDetails || {},
                        contextDetails: GigaTester.contextDetails || {}
                      }
                    if(!feedbackData.feedbackType) {
                        console.log('GigaTester: error posting feedback/bug: feedbackType not found in parameter');
                        return false;
                    } else if(typeof feedbackData.feedbackType !== 'string' || (feedbackData.feedbackType !== 'FEEDBACK' && feedbackData.feedbackType !== 'BUGS')) {
                        console.log('GigaTester: error posting feedback/bug: value of feedbackType field should be "FEEDBACK" or "BUGS"');
                        return false;
                    } else {
                        postData.feedbackType = feedbackData.feedbackType;
                    }

                    if(feedbackData.rating) {
                        if(typeof feedbackData.rating === 'number') {
                            postData.productRating = feedbackData.rating;
                        } else {
                            console.log('GigaTester: error posting feedback/bug: type of rating field must be number');
                            return false;
                        }
                    }

                    if(feedbackData.comment) {
                        if(typeof feedbackData.comment === 'string') {
                            postData.feedbackComments.generalComment = feedbackData.comment;
                        } else {
                            console.log('GigaTester: error posting feedback/bug: type of comment field must be string');
                            return false;
                        }
                    }

                    if(feedbackData.severity) {
                        if(typeof feedbackData.severity === 'string') {
                            postData.feedbackComments.generalComment = feedbackData.severity;
                        } else {
                            console.log('GigaTester: error posting feedback/bug: type of severity field must be string');
                            return false;
                        }
                    }

                    if(feedbackData.email) {
                        if(typeof feedbackData.email === 'string') {
                            postData.userName = feedbackData.email;
                        } else {
                            console.log('GigaTester: error posting feedback/bug: type of email field must be string');
                            return false;
                        }
                    }

                    if(feedbackData.userDetails) {
                        if(typeof feedbackData.userDetails === 'object') {
                            postData.userDetails = feedbackData.userDetails;
                        } else {
                            console.log('GigaTester: error posting feedback/bug: type of userDetails field must be a map');
                            return false;
                        }
                    }

                    if(feedbackData.contextDetails) {
                        if(typeof feedbackData.contextDetails === 'object') {
                            postData.contextDetails = feedbackData.contextDetails;
                        } else {
                            console.log('GigaTester: error posting feedback/bug: type of contextDetails field must be a map');
                            return false;
                        }
                    }

                    if(feedbackData.categoryComments) {
                        if(typeof feedbackData.categoryComments === 'object') {
                            if(feedbackData.categoryComments.category && typeof feedbackData.categoryComments.category === 'string') {
                                postData.feedbackCategory = feedbackData.categoryComments.category;
                            } else {
                                console.log('GigaTester: error posting feedback/bug: type of categoryComments.category field must be a string');
                                return false;
                            }

                            if(feedbackData.categoryComments.comments) {
                                if(typeof feedbackData.categoryComments.comments === 'object') {
                                    for(let i = 0; i < feedbackData.categoryComments.comments.length; i += 1) {
                                        if(typeof feedbackData.categoryComments.comments[i] === 'string') {
                                            postData.feedbackComments.standardFeedback.push(feedbackData.categoryComments.comments[i]);
                                        } else {
                                            console.log('GigaTester: error posting feedback/bug: type of categoryComments.comments field must be a string array');
                                            return false;
                                        }
                                    }
                                } else {
                                    console.log('GigaTester: error posting feedback/bug: type of categoryComments.comments field must be a string array');
                                    return false;
                                }
                            }
                        } else {
                            console.log('GigaTester: error posting feedback/bug: type of categoryComments field must be a map');
                            return false;
                        }
                    }

                    if(feedbackData.platformName) {
                        if(typeof feedbackData.platformName === 'string') {
                            postData.platformName = feedbackData.platformName;
                        } else {
                            console.log('GigaTester: error posting feedback/bug: type of platformName field must be string');
                            return false;
                        }
                    }

                    if(feedbackData.platformVersion) {
                        if(typeof feedbackData.platformVersion === 'string') {
                            postData.platformVersion = feedbackData.platformVersion;
                        } else {
                            console.log('GigaTester: error posting feedback/bug: type of platformVersion field must be string');
                            return false;
                        }
                    }

                    if(feedbackData.platformOs) {
                        postData.platformOs = feedbackData.platformOs;
                    }

                    if(feedbackData.pageURL) {
                        if(typeof feedbackData.pageURL === 'string') {
                            postData.pageURL = feedbackData.pageURL;
                        } else {
                            console.log('GigaTester: error posting feedback/bug: type of pageURL field must be string');
                            return false;
                        }
                    }
                    console.log(postData, 'GigaTester: postFeedback API: post Data')
                    const returnData = await fetch(`${GigaTester.endpoint}/feedback/`, {
                      method: 'POST',
                      body:  JSON.stringify(postData),
                      headers: { 'Content-Type': 'application/json' },
                    })
                    if(returnData.ok) {
                        const JSONReturnData = await returnData.json();
                        console.log(JSONReturnData, 'GigaTester: postFeedback API: JSONReturnData');
                        console.log('GigaTester: successfully posted feedback/bug');
                        return true;
                    } else {
                        console.log(error, 'GigaTester: error posting feedback/bug: ');
                        return false;
                    }
                } else {
                    console.log('GigaTester: error posting feedback/bug: parameter is not an object');
                    return false;
                }
            },
        }
        window.GigaTester = $.extend(window.GigaTester, GigaTester_Api);
        $(document).ready($.proxy(GigaTester_modal.init, GigaTester_modal))
    })(window.jQuery);
    }catch(err){
        console.log(err, 'GigaTester: err in jQuery')
    }
}
}
function checkgigatester(){
    if(typeof window.jQuery === "undefined"){
        setTimeout(() => {
            checkgigatester();
            // console.log('GigaTester: inside giga timeout function')
        }, 200);
    }
    else{
        console.log('inside giga timeout outside')
        // console.log(typeof window.jQuery);
        gigatester();
    }
}
checkgigatester()

if (typeof _temp_$ !== "undefined" && _temp_$) {
    window.$ = _temp_$
}
if (typeof _temp_jQuery !== "undefined" && _temp_jQuery) {
    window.jQuery = _temp_jQuery
}
})();