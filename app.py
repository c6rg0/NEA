from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/hello") # "/hello" routes to "http://url.com/hello"
def hello_world():
    name = request.args.get("name", "Flask")
    return f"Hello, {escape(name)}!"


