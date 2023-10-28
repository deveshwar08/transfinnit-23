from fastapi import FastAPI
from fastapi import Response, Request
from fastapi.middleware.cors import CORSMiddleware
from config.logger import logger
from io import BytesIO
import os
from dotenv import find_dotenv, load_dotenv
import requests
import json
import base64

load_dotenv(find_dotenv())

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Hello, FastAPI!"}

@app.post("/generate")
async def generate_image(req: Request):
	url = "https://api.wizmodel.com/sdapi/v1/txt2img"
	req_data = await req.json()
	payload = json.dumps({
        "prompt": req_data.get("prompt", ""),
        "steps": 30
    })
	headers = {
  		'Content-Type': 'application/json',
  		'Authorization': 'Bearer '+os.getenv("API_KEY")
	}
	response = requests.post(url, headers=headers, data=payload)
	response.raise_for_status()
	base64_image = response.json().get('images')[0]
	image_bytes = base64.b64decode(base64_image)
	return Response(content=image_bytes, media_type="image/png")

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("FRONTEND_URL"),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)