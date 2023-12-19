// WebPConverter.m

#import "WebPConverter.h"
#import <React/RCTLog.h>
#import <SDWebImage/SDWebImage.h>
#import <SDWebImageWebPCoder/SDWebImageWebPCoder.h>
#import "NSData+Base64.h" // Add this import for base64 encoding

@implementation WebPConverter

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(convertToWebP:(NSString *)imageUrl resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        // Register the WebP coder
        [SDImageCodersManager.sharedManager addCoder:SDImageWebPCoder.sharedCoder];

        // Load the image without downloading it
        NSURL *url = [NSURL URLWithString:imageUrl];
        [[SDWebImageManager sharedManager] loadImageWithURL:url options:0 context:nil progress:nil completed:^(UIImage * _Nullable image, NSData * _Nullable data, NSError * _Nullable error, SDImageCacheType cacheType, BOOL finished, NSURL * _Nullable imageURL) {
            if (error) {
                reject(@"IMAGE_LOAD_ERROR", @"Error loading image", error);
            } else {
                // Convert UIImage to WebP NSData using SDWebImageWebPCoder
                NSData *webpData = [SDImageWebPCoder.sharedCoder encodedDataWithImage:image format:SDImageFormatWebP options:nil];

                if (webpData) {
                    // Encode the NSData to base64
                    NSString *webpBase64 = [webpData base64EncodedStringWithSeparateLines:NO]; // Use appropriate options

                    RCTLogInfo(@"WebP Base64: %@", webpBase64);

                    // If conversion is successful, resolve the promise
                    resolve([NSString stringWithFormat:@"data:image/webp;base64,%@", webpBase64]);
                } else {
                    // Log an error if the WebP data is nil
                    RCTLogError(@"Error converting image to WebP: WebP data is nil");
                    reject(@"CONVERSION_ERROR", @"Error converting image to WebP", nil);
                }
            }
        }];
    } @catch (NSException *exception) {
        // If an error occurs during conversion, reject the promise
        reject(@"CONVERSION_ERROR", @"Error converting image to WebP", nil);
    }
}

@end
