const questions = [
    {
        num: 1,
        title: 'Write a program to reverse an array or string',
        desc: 'Given an array (or string), the task is to reverse the array/string.',
        diffLevel: 'ez',
        hint: `#include <stdio.h>
void print(int arr[], int n){
    for (int i = 0; i < n; i++) 
    printf("%d ", arr[i]);
}
void reverse(int arr[], int n){
    int aux[n];
    for (int i = 0; i < n; i++) 
    aux[n - 1 - i] = arr[i];
    for (int i = 0; i < n; i++) 
    arr[i] = aux[i];
}
int main(void){
    int arr[10];
    int n, i;

    scanf("%d", &n);
    for(i=0; i<n; i++)
    scanf("%d", &arr[i]);

    reverse(arr, n);
    print(arr, n);
    return 0;
}`,
        testCases: [{
            inputFront: 'N = 3, arr[] =  1 2 3',
            input: '3 1 2 3',
            output: '3 2 1',
            hidden: false
        },
        {
            inputFront: 'N = 5, arr[] = 3 22 34 63 94',
            input: '5 3 22 34 63 94',
            output: '94 63 34 22 3',
            hidden: false
        }]
    },
    {
        num: 2,
        title: 'Find the maximum and minimum element in an array',
        desc: 'Write a function to return minimum and maximum in an array. Your program should make the minimum number of comparisons',
        diffLevel: 'ez',
        hint: `#include <stdio.h>
// Function to find the minimum and
// maximum element of the array
void findMinimumMaximum(int arr[], int n)
{
    int i;
    // variable to store the minimum
    // and maximum element
    int min = arr[0], max = arr[0];
    // Traverse the given array
    for (i = 0; i < n; i++)
    {
        // If current element is smaller
        // than min then update it
        if (arr[i] < min)
        {
            min = arr[i];
        }
        // If current element is greater
        // than max then update it
        if (arr[i] > max)
        {
            max = arr[i];
        }
    }
    // Print the minimum and maximum element
    printf("%d %d", min, max);
}
int main()
{
    // Given array
    int arr[10];
    int n,i;
    scanf("%d", &n);
    for(i=0; i<n; i++)
        scanf("%d", &arr[i]);
    // Function call
    findMinimumMaximum(arr, n);
    return 0;
}`,
        testCases: [{
            inputFront: 'N = 5, arr[] = 1000 11 445 1 330',
            input: '5 1000 11 445 1 330',
            output: '1 1000',
            hidden: false
        }, {
            input: 'N = 10, arr[] = 396 27 310 6869 183 91 492 151 278 208',
            input: '10 396 27 310 6869 183 91 492 151 278 208',
            output: '27 6869',
            hidden: false
        }]
    },
    {
        num: 3,
        title: 'Kth smallest element',
        desc: `Given an array arr[ ] and an integer K where K is smaller than size of array, 
        the task is to find the Kth smallest element in the given array. It is given that all array elements are distinct.`,
        diffLevel: 'med',
        hint: `#include <stdio.h>

void swap(int* a, int* b){
    int temp = *a;
    *a = *b;
    *b = temp;
}
void sort(int* arr, int n){
    int i, j;
    for(i = 0;i < n; i++){
        for(j = i + 1; j<n; j++){
            if(arr[i]>arr[j]){
                swap(&arr[i], &arr[j]);
            }
        }
    }
}

int main(){
    int arr[10];
    int n, i, j, k;
    scanf("%d", &n);
    for(i=0; i<n; i++)
        scanf("%d", &arr[i]);
    scanf("%d", &k);
    sort(&arr, n);
    
    printf("%d", arr[k-1]);
    return 0;
}`,
        testCases: [
            {
                inputFront: 'N = 6, arr[] = 7 10 4 3 20 15, k = 3',
                input: '6 7 10 4 3 20 15 3',
                output: '7',
                hidden: false,
                explanation: '3rd smallest element in the given array is 7.'
            },
            {
                inputFront: 'N = 5, arr[] = 7 10 4 20 15, K = 4',
                input: '5 7 10 4 20 15 4',
                output: '15',
                hidden: false,
                explanation: '4th smallest element in the given array is 15.',
            }
        ]
    },
    {
        num: 4,
        title: 'Sort an array of 0s, 1s and 2s',
        desc: 'Given an array of size N containing only 0s, 1s, and 2s; sort the array in ascending order (without using algo).',
        diffLevel: 'ez',
        hint: `#include <stdio.h>

void swap(int* a, int* b){
    int temp = *a;
    *a = *b;
    *b = temp;
}
void sort(int* arr, int n){
    int i, j;
    for(i = 0;i < n; i++){
        for(j = i + 1; j<n; j++){
            if(arr[i]>arr[j]){
                swap(&arr[i], &arr[j]);
            }
        }
    }
}

int main(){
    int arr[10];
    int n, i;
    scanf("%d", &n);
    for(i=0; i<n; i++)
        scanf("%d", &arr[i]);
    sort(&arr, n);

    for(i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    return 0;
}`,
        testCases: [
            {
                inputFront: 'N = 5, arr[] = 0 2 1 2 0',
                input: '5 0 2 1 2 0',
                output: '0 0 1 2 2',
                explanation: '0s 1s and 2s are segregated into ascending order.',
                hidden: false
            }, {
                inputFront: 'N = 3, arr[] = 0 1 0',
                input: '3 0 1 0',
                output: '0 0 1',
                explanation: '0s 1s and 2s are segregated into ascending order.',
                hidden: false
            }
        ]
    },
    // {
    //     num: 5,
    //     title: 'Move all negative numbers to beginning and positive to end with constant extra space',
    //     desc: 'An array contains both positive and negative numbers in random order. Rearrange the array elements so that all negative numbers appear before all positive numbers.',
    //     diffLevel: 'ez',
    //     testCases: [{
    //         inputFront: 'N = 5, arr[] = 2 -3 -7 5 -13',
    //         input: '5 2 -3 -7 5 -13',
    //         output: '-3 -7 -13 2 5',
    //         hidden: false
    //     },
    //     {
    //         inputFront: 'N = 9, arr[] = -12 11 -13 -5 6 -7 5 -3 -6',
    //         input: '-12 11 -13 -5 6 -7 5 -3 -6',
    //         output: '-12 -13 -5 -7 -3 -6 11 6 5',
    //         hidden: false
    //     }
    // ]
    // },
    {
        num: 5,
        title: 'Cyclically rotate an array by one',
        desc: 'Given an array, rotate the array by one position in clock-wise direction.',
        diffLevel: 'ez',
        hint: `
#include <stdio.h>

void rotate(int* arr, int n){
    int i, j;
    int lastNum = arr[n-1];

    for(i = n; i > 0; i--)
        arr[i] = arr[i-1];
    arr[0] = lastNum;
}

int main(){
    int arr[10];
    int n, i;
    scanf("%d", &n);
    for(i=0; i<n; i++)
        scanf("%d", &arr[i]);
    rotate(&arr, n);

    for(i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    return 0;
}`,
        testCases: [
            {
                inputFront: 'N = 5, arr[] = 1 2 3 4 5',
                input: '5 1 2 3 4 5',
                output: '5 1 2 3 4',
                hidden: false
            },
            {
                inputFront: 'N = 8, arr[] = 9 8 7 6 4 2 1 3',
                input: '8 9 8 7 6 4 2 1 3',
                output: '3 9 8 7 6 4 2 1',
                hidden: false
            }
        ]
    },
    {
        num: 6,
        title: "Kadane's Algorithm - find Largest sum contiguous Subarray",
        desc: `Given an array Arr[] of N integers. Find the contiguous 
                sub-array(containing at least one number) which has the
                maximum sum and return its sum.`,
        diffLevel: 'medium',
        imp: true,
        hint: `#include <stdio.h>
int main(){
    int arr[10];
    int n, i, j;
    int sum = 0, temp;
    scanf("%d", &n);
    for(i = 0; i < n; i++)
        scanf("%d", &arr[i]);
    sum = arr[0];
    for(i = 0; i < n; i++){
        temp = 0;
        for(j = i; j < n; j++){
            temp+=arr[i];
        }
        if(temp>sum)
            sum = temp;
    }
    printf("%d", sum);
    return 0;
}`,
        testCases: [
            {
                inputFront: 'N = 5, arr[] = 1 2 3 -2 5',
                input: '5 1 2 3 -2 5',
                output: '9',
                explanation: `Max subarray sum is 9
                of elements (1, 2, 3, -2, 5) which 
                is a contiguous subarray.`,
                hidden: false,
            },
            {
                inputFront: 'N = 4, arr[] = -1 -2 -3 -4',
                input: '4 -1 -2 -3 -4',
                output: '-1',
                explanation: `Max subarray sum is -1 
                of element (-1)`,
                hidden: false
            }
        ]
    },
    {
        num: 7,
        title: 'Union of two arrays ',
        desc: `Given two arrays arr1[ ] and arr2[ ] of size L and M respectively. The task is to
             find union between these two arrays.

        Union of the two arrays can be defined as the set containing distinct elements 
        from both the arrays. If there are repetitions, then only one occurrence of
        element should be printed in the union.`,
        diffLevel: 'ez',
        hint: `#include <stdio.h>
int main(void){
    int arr1[10], arr2[10];
    int unionCount;
    int l, m, i, j;
    int flag;

    scanf("%d", &l);
    scanf("%d", &m);

    //inputs
    for(i=0; i < l; i++)
        scanf("%d", &arr1[i]);
    for(i=0; i < m; i++)
        scanf("%d", &arr2[i]);

    unionCount = l;

    for(i=0; i < m; i++){
        flag = 0;
        for(j=0; j < l; j++)
            if(arr2[i] == arr1[j]){
                flag = 1;
                break;
            }
        if(flag == 0)
            unionCount++;
    }   

    printf("%d", unionCount);
    return 0;
}`,
        testCases: [{
            inputFront: 'L = 5, M = 3, arr1[]= 1 2 3 4 5, arr2[] = 1 2 3',
            input: '5 3 1 2 3 4 5 1 2 3',
            output: '5',
            explanation: `1, 2, 3, 4 and 5 are the elements which comes in the union set
            of both arrays. So count is 5`,
            hidden: false
        },
        {
            inputFront: 'L = 6, M = 2, arr1[] = 85 25 1 32 54 6, arr2[] = 85 2',
            explanation: `85, 25, 1, 32, 54, 6, and 2 are the elements which 
            comes in the union set of both arrays. So count is 7.`,
            input: '6 2 85 25 1 32 54 6 85 2',
            output: '7',
            hidden: false
        },
        ]
    },



]

module.exports = questions