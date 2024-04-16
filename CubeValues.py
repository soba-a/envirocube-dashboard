import requests
import csv
import time
from datetime import datetime

def fetch_data():
    url = 'http://172.20.10.10/data'  # Replace 'example.com/data' with the actual URL of the website
    response = requests.get(url)
    data = response.json()
    print(data)
    return data

def write_to_csv(data):
    with open(r'C:\Users\jq999\Desktop\CS Projects\Envirocube Dashboard\envirocube-dashboard\public\data\envirocubedata.csv', 'a', newline='') as csvfile: #change to 'a' to append
        fieldnames = ['time', 'temp', 'humidity', 'air', 'volume', 'currentFace', 'currentReading']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        if csvfile.tell() == 0:  # Check if file is empty, write header if so
            writer.writeheader()

        writer.writerow({'time': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                         'temp': data['temp'],
                         'humidity': data['humidity'],
                         'air': data['air'],
                         'volume': data['volume'],
                         'currentFace': data['currentFace'],
                         'currentReading': data['currentReading']
                         })

def main():
    try:
        while True:
            try:
                data = fetch_data()
                write_to_csv(data)
                time.sleep(3)
            except KeyboardInterrupt:
                print("Keyboard interrupt detected. Exiting...")
                break
            except:
                print("error in json. continuing...")
    except KeyboardInterrupt:
        print("Keyboard interrupt detected. Exiting...")
    

if __name__ == "__main__":
    main()
