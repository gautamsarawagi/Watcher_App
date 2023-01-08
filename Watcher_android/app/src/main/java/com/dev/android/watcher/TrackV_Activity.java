package com.dev.android.watcher;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.ImageFormat;
import android.graphics.SurfaceTexture;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraCaptureSession;
import android.hardware.camera2.CameraCharacteristics;
import android.hardware.camera2.CameraDevice;
import android.hardware.camera2.CameraManager;
import android.hardware.camera2.CameraMetadata;
import android.hardware.camera2.CaptureRequest;
import android.hardware.camera2.TotalCaptureResult;
import android.hardware.camera2.params.StreamConfigurationMap;
import android.media.Image;
import android.media.ImageReader;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.HandlerThread;
import android.util.Size;
import android.util.SparseIntArray;
import android.view.Surface;
import android.view.TextureView;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.Toast;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executor;

public class TrackV_Activity extends AppCompatActivity  {



    ImageView tool_profile,track_c,track_t;
    ProgressBar progressBar;


//    TextureView textureView;
//    RelativeLayout capture_btn,map_btn;
    RelativeLayout map_btn;
    EditText license_no;

    String lan,lng;






    //Check static orientation of output image

//    private static final SparseIntArray ORIENTATIONS=new SparseIntArray();
//    static {
//        ORIENTATIONS.append(Surface.ROTATION_0,90);
//        ORIENTATIONS.append(Surface.ROTATION_90,0);
//        ORIENTATIONS.append(Surface.ROTATION_180,270);
//        ORIENTATIONS.append(Surface.ROTATION_270,180);
//    }
//
//    private String cameraId;
//    private CameraDevice cameraDevice;
//    private CameraCaptureSession cameraCaptureSessions;
//    private CaptureRequest.Builder captureRequestBuilder;
//    private Size imageDimension;
//    private ImageReader imageReader;
//
//    //Save to file
//    private File file;
//    private static final int REQUEST_CAMERA_PERMISSION=200;
//    private Handler mBackgroundHandler;
//    private HandlerThread mBackgroundThread;
//
//
//    //camera
//    CameraDevice.StateCallback stateCallBack=new CameraDevice.StateCallback() {
//        @Override
//        public void onOpened(@NonNull CameraDevice camera) {
//            cameraDevice=camera;
//            createCameraPreview();
//        }
//
//        @Override
//        public void onDisconnected(@NonNull CameraDevice camera) {
//           cameraDevice.close();
//        }
//
//        @Override
//        public void onError(@NonNull CameraDevice camera, int error) {
//            cameraDevice.close();
//            cameraDevice=null;
//        }
//    };





    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_track_vactivity);

        tool_profile=findViewById(R.id.tool_profile);
        track_c=findViewById(R.id.track_c);
        track_t=findViewById(R.id.track_t);
        license_no=findViewById(R.id.license_number);
//
//        textureView=findViewById(R.id.texture_view);
//        capture_btn=findViewById(R.id.capture_btn);
        map_btn=findViewById(R.id.map_btn);
        progressBar=findViewById(R.id.progress_bar);


        //Goto  map
        map_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String number=license_no.getText().toString();

                progressBar.setVisibility(View.VISIBLE);

                DatabaseReference reference= FirebaseDatabase.getInstance().getReference().child("Crime Register");
                Query checkData=reference.orderByChild("license_number").equalTo(number);

                checkData.addListenerForSingleValueEvent(new ValueEventListener() {
                    @Override
                    public void onDataChange(@NonNull DataSnapshot snapshot) {
                        if(snapshot.exists()){

                            String l_num=snapshot.child(number).child("license_number").getValue().toString();

                            if(l_num.equals(number)){
                                lan=snapshot.child(number).child("lan").getValue().toString();
                                lng=snapshot.child(number).child("lng").getValue().toString();

                                Intent intent=new Intent(TrackV_Activity.this,MapActivity.class);

                                intent.putExtra("number",number);
                                intent.putExtra("lan",lan);
                                intent.putExtra("lng",lng);
                                startActivity(intent);
                            }
                        }
                        progressBar.setVisibility(View.GONE);

                    }

                    @Override
                    public void onCancelled(@NonNull DatabaseError error) {

                    }
                });



            }

        });



        //Camera

//        assert textureView!=null;
//
//        textureView.setSurfaceTextureListener(textureListener);
//
//        capture_btn.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                takePicture();
//            }
//        });









      ////////
        track_c.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(TrackV_Activity.this,TrackC_Activity.class));
                finish();
            }
        });


        track_t.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(TrackV_Activity.this,TrackTActivity.class));
                finish();
            }
        });


        tool_profile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(TrackV_Activity.this,Profile_Activity.class));
            }
        });

        ///////





    }

//
//    private void takePicture() {
//        if(cameraDevice==null)
//            return;
//
//        CameraManager manager=(CameraManager) getSystemService(Context.CAMERA_SERVICE);
//
//        try{
//
//            CameraCharacteristics characteristics=manager.getCameraCharacteristics(cameraDevice.getId());
//            Size [] jpegSizes=null;
//            if(characteristics!=null)
//                jpegSizes=characteristics.get(CameraCharacteristics.SCALER_STREAM_CONFIGURATION_MAP)
//                        .getOutputSizes(ImageFormat.JPEG);
//
//
//                //capture image with custom size
//                int width=640;
//                int height=480;
//                if(jpegSizes!=null && jpegSizes.length>0){
//                    width=jpegSizes[0].getWidth();
//                    height=jpegSizes[0].getHeight();
//                }
//                ImageReader reader=ImageReader.newInstance(width,height,ImageFormat.JPEG,1);
//
//                List<Surface> outputSurface=new ArrayList<>(2);
//                outputSurface.add(reader.getSurface());
//                outputSurface.add(new Surface(textureView.getSurfaceTexture()));
//
//                CaptureRequest.Builder captureBuilder=cameraDevice.createCaptureRequest(cameraDevice.TEMPLATE_STILL_CAPTURE);
//                captureBuilder.addTarget(reader.getSurface());
//                captureBuilder.set(CaptureRequest.CONTROL_MODE, CameraMetadata.CONTROL_MODE_AUTO);
//
//                //check rotation base on device
//
//                int rotation=getWindowManager().getDefaultDisplay().getRotation();
//                captureBuilder.set(CaptureRequest.JPEG_ORIENTATION,ORIENTATIONS.get(rotation));
//
//                file=new File(Environment.getExternalStorageDirectory()+"/"+UUID.randomUUID().toString()+".jpg");
//
//                ImageReader.OnImageAvailableListener readerListener=new ImageReader.OnImageAvailableListener() {
//                    @Override
//                    public void onImageAvailable(ImageReader reader) {
//                      Image image=null;
//                      try {
//                          image=reader.acquireLatestImage();
//                          ByteBuffer buffer=image.getPlanes()[0].getBuffer();
//                          byte[] bytes=new byte[buffer.capacity()];
//                          buffer.get(bytes);
//                          save(bytes);
//                      }
//                      catch (FileNotFoundException e)
//                      {
//                          e.printStackTrace();
//                      }
//                      catch (IOException e)
//                      {
//                          e.printStackTrace();
//                      }
//                      finally {
//                          {
//                              if(image!=null)
//                                  image.close();
//                          }
//                      }
//                    }
//                    private  void save(byte[] bytes) throws IOException {
//
//                        OutputStream outputStream=null;
//                        try{
//                            outputStream=new FileOutputStream(file);
//                            outputStream.write(bytes);
//                        }finally {
//                            if(outputStream!=null)
//                                outputStream.close();
//                        }
//                    }
//                };
//
//                reader.setOnImageAvailableListener(readerListener,mBackgroundHandler);
//            CameraCaptureSession.CaptureCallback captureListener=new CameraCaptureSession.CaptureCallback() {
//                @Override
//                public void onCaptureCompleted(@NonNull CameraCaptureSession session, @NonNull CaptureRequest request, @NonNull TotalCaptureResult result) {
//                    super.onCaptureCompleted(session, request, result);
//                    Toast.makeText(TrackV_Activity.this, "Saved"+file, Toast.LENGTH_SHORT).show();
//                    createCameraPreview();
//                }
//            };
//            cameraDevice.createCaptureSession(outputSurface, new CameraCaptureSession.StateCallback() {
//                @Override
//                public void onConfigured(@NonNull CameraCaptureSession cameraCaptureSession) {
//                    try{
//                        cameraCaptureSession.capture(captureBuilder.build(),captureListener,mBackgroundHandler);
//                    }catch (CameraAccessException e){
//                        e.printStackTrace();
//                    }
//                }
//
//                @Override
//                public void onConfigureFailed(@NonNull CameraCaptureSession cameraCaptureSession) {
//
//                }
//            },mBackgroundHandler);
//
//        }catch (CameraAccessException e){
//            e.printStackTrace();
//
//        }
//    }
//
//    private void createCameraPreview() {
//        try{
//            SurfaceTexture texture=textureView.getSurfaceTexture();
//            assert texture!=null;
//            texture.setDefaultBufferSize(imageDimension.getWidth(),imageDimension.getHeight());
//            Surface surface=new Surface(texture);
//            captureRequestBuilder=cameraDevice.createCaptureRequest(cameraDevice.TEMPLATE_PREVIEW);
//            captureRequestBuilder.addTarget(surface);
//            cameraDevice.createCaptureSession(Arrays.asList(surface), new CameraCaptureSession.StateCallback() {
//                @Override
//                public void onConfigured(@NonNull CameraCaptureSession cameraCaptureSession) {
//                   if(cameraDevice==null)
//                       return;
//                   cameraCaptureSessions=cameraCaptureSession;
//                   updatePreview();
//                }
//
//                @Override
//                public void onConfigureFailed(@NonNull CameraCaptureSession cameraCaptureSession) {
//
//                    Toast.makeText(TrackV_Activity.this, "Changed", Toast.LENGTH_SHORT).show();
//                }
//            },null);
//        }catch (CameraAccessException e){
//            e.printStackTrace();
//        }
//    }
//
//    private void updatePreview() {
//        if(cameraDevice==null)
//            Toast.makeText(this, "Error", Toast.LENGTH_SHORT).show();
//        captureRequestBuilder.set(CaptureRequest.CONTROL_MODE,CaptureRequest.CONTROL_MODE_AUTO);
//
//        try{
//            cameraCaptureSessions.setRepeatingRequest(captureRequestBuilder.build(),null,mBackgroundHandler);
//        } catch (CameraAccessException e) {
//            e.printStackTrace();
//        }
//    }
//
//
//    private void openCamera() {
//
//        CameraManager manager=(CameraManager)getSystemService(Context.CAMERA_SERVICE);
//        try {
//            cameraId=manager.getCameraIdList()[0];
//            CameraCharacteristics characteristics=manager.getCameraCharacteristics(cameraId);
//            StreamConfigurationMap map=characteristics.get(CameraCharacteristics.SCALER_STREAM_CONFIGURATION_MAP);
//            assert map!=null;
//            imageDimension=map.getOutputSizes(SurfaceTexture.class)[0];
//            //check real time permission if run higher API 23
//            if(ActivityCompat.checkSelfPermission(this, Manifest.permission.CAMERA)!= PackageManager.PERMISSION_GRANTED)
//            {
//                ActivityCompat.requestPermissions(this,new String[]{
//                        Manifest.permission.CAMERA,
//                        Manifest.permission.WRITE_EXTERNAL_STORAGE
//                },REQUEST_CAMERA_PERMISSION);
//                return;
//            }
//            manager.openCamera(cameraId,stateCallBack,null);
//        } catch (CameraAccessException e) {
//            e.printStackTrace();
//        }
//
//    }

    //ctrl+O
//
//TextureView.SurfaceTextureListener textureListener=new TextureView.SurfaceTextureListener() {
//    @Override
//    public void onSurfaceTextureAvailable(@NonNull SurfaceTexture surface, int width, int height) {
//
//        openCamera();
//    }
//
//    @Override
//    public void onSurfaceTextureSizeChanged(@NonNull SurfaceTexture surface, int width, int height) {
//
//    }
//
//    @Override
//    public boolean onSurfaceTextureDestroyed(@NonNull SurfaceTexture surface) {
//        return false;
//    }
//
//    @Override
//    public void onSurfaceTextureUpdated(@NonNull SurfaceTexture surface) {
//
//    }
//};
//
//    @Override
//    protected void onPostResume() {
//        super.onPostResume();
//        startBackgroundThread();
//        if(textureView.isAvailable())
//            openCamera();
//
//        else
//            textureView.setSurfaceTextureListener(textureListener);
//    }
//
//    @Override
//    protected void onPause() {
//        stopBackgroundThread();
//        super.onPause();
//    }
//
//    private void stopBackgroundThread() {
//        mBackgroundThread.quitSafely();
//        try {
//            mBackgroundThread.join();
//            mBackgroundThread=null;
//            mBackgroundHandler=null;
//
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
//    }
//
//    private void startBackgroundThread() {
//        mBackgroundThread=new HandlerThread("Camera Background");
//        mBackgroundThread.start();
//        mBackgroundHandler=new Handler(mBackgroundThread.getLooper());
//
//    }
//
//    @Override
//    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
//        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
//        if (requestCode == REQUEST_CAMERA_PERMISSION) {
//            if (grantResults[0] != PackageManager.PERMISSION_GRANTED) {
//                Toast.makeText(TrackV_Activity.this, "You can't use camera without permission", Toast.LENGTH_SHORT).show();
//                finish();
//            }
//        }
//
//
//    }
}
