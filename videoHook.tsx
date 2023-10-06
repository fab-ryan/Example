import { useCallback, useEffect, useRef } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'


const useVideoJs = (videoJsOption: any) => {
    const videoNode = useRef<HTMLVideoElement | null>(null);
    const player = useRef<any>(null)
    const changedKey = videoJsOption.changedKey

    useEffect(() => {
        player.current = videojs(videoNode?.current ?? 'string', videoJsOption)
        return () => {
            player.current.dispose()
        }
    }, [videoJsOption])

    const Video = useCallback(
        (props: React.HTMLProps<HTMLVideoElement>) => {
            const { children, ...restProps } = props;
            return (
                <div data-vjs-player key={changedKey}>
                    <video ref={videoNode} className="video-js" {...props}>
                        {children}
                    </video>
                </div>
            )
        },
        [changedKey],
    )

    return { Video, player: player.current }
}
interface Iprops {
    video: {
        poster: string,
        url: string,
        subtitle?: string
    }
}
export default function VideoPlayer({ video }: Iprops) {
    const { Video } = useVideoJs(
        {
            poster: video.poster || undefined,
            sources: [{ src: video.url }],
            controls: true,
            playbackRates: [0.5, 1, 1.5, 2],
            responsive: true,
        }
    )
    return (<Video poster={video.poster} playsInline muted >
        <track
            src={video.subtitle}
            kind="subtitle"
            srcLang='en'
            label='En' />
    </Video>)
} 
