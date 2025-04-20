import { useSearchParams } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import Text from "../components/text";
import { useState, useRef } from "react";
import { toJpeg } from "html-to-image";

const EditPage = () => {
    const [params] = useSearchParams();
    const [texts, setTexts] = useState<JSX.Element[]>([]);
    const memeRef = useRef<HTMLDivElement>(null);

    const handleExport = () => {
        if (!memeRef.current) return;

        toJpeg(memeRef.current, {
            quality: 0.95,
            backgroundColor: "#fff",
        }).then(dataUrl => {
            const link = document.createElement("a");
            link.download = "meme.jpg";
            link.href = dataUrl;
            link.click();
        });
    };

    const addText = () => {
        setTexts(prev => [
            ...prev,
            <Text key={Date.now()} />
        ]);
    };

    return (
        <Container className="my-5">
            <div className="d-flex flex-column align-items-center">
                <div 
                    ref={memeRef}
                    style={{ 
                        position: "relative",
                        maxWidth: "800px",
                        padding: "40px",
                        backgroundColor: "#fff",
                        border: "2px dashed #ccc",
                        margin: "20px",
                        minHeight: "500px"
                    }}
                >
                    <img 
                        src={params.get("url")} 
                        style={{ 
                            maxWidth: "100%", 
                            height: "auto",
                            margin: "20px"
                        }} 
                        alt="Meme base" 
                    />
                    {texts}
                </div>

                <div className="mt-4 d-flex gap-3">
                    <Button 
                        variant="primary"
                        onClick={addText}
                        className="px-4"
                    >
                        Add Text
                    </Button>
                    <Button 
                        variant="success"
                        onClick={handleExport}
                        className="px-4"
                    >
                        Save Image
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default EditPage;