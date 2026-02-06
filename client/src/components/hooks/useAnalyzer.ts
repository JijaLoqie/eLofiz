import { audioState } from "@/middlewares/AudioMiddleware.ts";

export const useAnalyzer = (props: {spaceId: string}) => {
    const analyzer = audioState.items[props.spaceId].analyzer;

    return { analyzer }

}