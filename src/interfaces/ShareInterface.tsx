import GlassInterface from "./GlassInterface";

export default interface ShareInterface {
    id: string;
    name: string;
    glasses: GlassInterface[];
}