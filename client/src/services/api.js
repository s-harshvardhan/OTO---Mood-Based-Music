export const handleClick = async (description, navigate) => {
  try {
    console.log("description from handle click:", description);

    const response = await fetch("http://127.0.0.1:5000/api/generate_text", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: description }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(response);
    const contentType = response.headers.get("content-type");
    let songDescription = "";

    if (contentType && contentType.includes("application/json")) {
      const responseData = await response.json();
      songDescription = responseData.response;
    } else {
      console.error("Expected JSON response but got:", contentType);
    }

    if (typeof songDescription === "string") {
      songDescription = songDescription.replace(/"$/g, "");
    }

    console.log("song description from client side:", songDescription);

    if (songDescription) {
      navigate("/song", { state: { description: songDescription } });
    } else {
      console.error("Received null song description from server");
    }

    return songResponse(songDescription);
  } catch (error) {
    console.error("Error in handleClick:", error);
  }
};

export const songResponse = async (text) => {
  try {
    console.log("from song response:", text);

    const response = await fetch("http://localhost:5000/api/generate_song", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: text }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const songBlob = await response.blob();
    const url = window.URL.createObjectURL(songBlob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "song.mp3");
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error("Error in songResponse:", error);
  }
};

export const analyzeFace = async function (image, navigate) {
  try {
    const response = await fetch("http://localhost:5000/api/analyze_face", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: image }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const faceAnalysis = await response.json();
    console.log(faceAnalysis);

    // Extract the emotion data and create a description string
    const emotionData = faceAnalysis.response[0].emotion;
    const description = Object.entries(emotionData)
      .map(([emotion, value]) => `${emotion}: ${value.toFixed(2)}`)
      .join(", ");

    return handleClick(description, navigate);
  } catch (error) {
    console.error("Error in analyzeFace:", error);
  }
};

export const transcribeSpeech = async function (audio, navigate) {
  try {
    const formData = new FormData();
    formData.append("audio", audio);

    const response = await fetch("http://localhost:5000/api/transcribe_speech", {
      method: "POST",
      mode: "cors",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseBody = await response.text();
    let transcription = "";

    if (response.headers.get("content-type").includes("application/json")) {
      const speechAnalysis = JSON.parse(responseBody);
      transcription = speechAnalysis.transcription;
    } else {
      console.error("Expected JSON response but got:", response.headers.get("content-type"));
    }

    console.log("Transcription text:", transcription);

    // Pass the transcription text to handleClick
    return handleClick(transcription, navigate);
  } catch (error) {
    console.error("Error in transcribeSpeech:", error);
  }
};
