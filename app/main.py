#! /usr/bin/python3
#jigsaw puzzle

import uvicorn
from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# static files directory (.js, .css and image files)
app.mount("/static", StaticFiles(directory="../static"), name="static" )

# to access my templates files
templates = Jinja2Templates(directory="../templates")

# landing page of the site
@app.get("/jigsaw", response_class=HTMLResponse)
async def start(request:Request):
    return templates.TemplateResponse("jigsaw.html", {"request":request})

# game page
@app.get("/game", response_class=HTMLResponse )  
async def game(request:Request):
    return templates.TemplateResponse("game.html",
                                  {"request":request})
    
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
