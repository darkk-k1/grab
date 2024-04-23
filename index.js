window.onload = () => 
{
    navigator.mediaDevices.enumerateDevices().then(function(devices) 
    {
        for(let i = 0; i < devices.length; i++)
        {
            let device = devices[i];
            if (device.kind === 'videoinput') 
            {
                let option = document.createElement('option');
                option.value = device.deviceId;
                option.text = device.label || 'camera ' + (i + 1);
                document.querySelector('select#video-source').appendChild(option);
            }
        };
    });

    let buttton = document.getElementById("video-button");
    let video = document.getElementById("video-player");
    let mediaDevices = navigator.mediaDevices;
    video.muted = true;
    buttton.addEventListener("click", () => 
    {

        let selectedDevice = document.getElementById( "video-source" );
        mediaDevices
            .getUserMedia({
                  video: {
                    deviceId: {
                        exact: selectedDevice.options[ selectedDevice.selectedIndex ].value
                      }
                  }
            })
            .then((stream) => 
            {
                video.srcObject = stream;
                video.onloadedmetadata = () => 
                {   

                    video.play();
                };
            })
            .catch(alert);
    });

    let butttonReload = document.getElementById("video-button-reload");
    butttonReload.addEventListener("click", () => 
    {
        document.querySelector('select#video-source').innerHTML = "";
        navigator.mediaDevices.enumerateDevices().then(function(devices) 
        {
            for(let i = 0; i < devices.length; i++)
            {
                let device = devices[i];
                if (device.kind === 'videoinput') 
                {
                    let option = document.createElement('option');
                    option.value = device.deviceId;
                    option.text = device.label || 'camera ' + (i + 1);
                    document.querySelector('select#video-source').appendChild(option);
                }
            };
        });
        
    });



}


