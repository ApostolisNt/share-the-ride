import type { ImageProps } from "next/image";
import { default as NextImage } from "next-export-optimize-images/image";
// https://next-export-optimize-images.vercel.app/docs/intro

type ImageT = {
    placeholder?: ImageProps["placeholder"];
} & ImageProps;

export const Image = ({ ...props }: ImageT) => {
    return (
        <NextImage
            {...props}
            placeholder={props.placeholder || "blur"}
        />
    );
};