import "@testing-library/jest-dom";

// Polyfill necesario para react-router-dom
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;